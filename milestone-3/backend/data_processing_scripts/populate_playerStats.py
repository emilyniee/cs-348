

import csv
from datetime import datetime
from database import init, make_query

def convert_date(date_str):
    """Convert date string from 'April 10, 2024' to 'YYYY-MM-DD'."""
    try:
        dt = datetime.strptime(date_str, "%B %d, %Y")
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        return date_str

NBA_TEAMS = {
    "ATL": "ATLANTA HAWKS",
    "BOS": "BOSTON CELTICS",
    "BKN": "BROOKLYN NETS",
    "CHA": "CHARLOTTE HORNETS",
    "CHI": "CHICAGO BULLS",
    "CLE": "CLEVELAND CAVALIERS",
    "DAL": "DALLAS MAVERICKS",
    "DEN": "DENVER NUGGETS",
    "DET": "DETROIT PISTONS",
    "GSW": "GOLDEN STATE WARRIORS",
    "HOU": "HOUSTON ROCKETS",
    "IND": "INDIANA PACERS",
    "LAC": "LOS ANGELES CLIPPERS",
    "LAL": "LOS ANGELES LAKERS",
    "MEM": "MEMPHIS GRIZZLIES",
    "MIA": "MIAMI HEAT",
    "MIL": "MILWAUKEE BUCKS",
    "MIN": "MINNESOTA TIMBERWOLVES",
    "NOP": "NEW ORLEANS PELICANS",
    "NYK": "NEW YORK KNICKS",
    "OKC": "OKLAHOMA CITY THUNDER",
    "ORL": "ORLANDO MAGIC",
    "PHI": "PHILADELPHIA 76ERS",
    "PHX": "PHOENIX SUNS",
    "POR": "PORTLAND TRAIL BLAZERS",
    "SAC": "SACRAMENTO KINGS",
    "SAS": "SAN ANTONIO SPURS",
    "TOR": "TORONTO RAPTORS",
    "UTA": "UTAH JAZZ",
    "WAS": "WASHINGTON WIZARDS",
}

output_csv = "./data/playerStats_test.csv"

with open(output_csv, "w", newline="", encoding="utf-8") as file:
    fieldnames = ["player_id", "game_id", "points", "assists", "rebounds", "blocks", 
                  "steals", "turnovers", "fg_attempts", "three_pt_attempts", 
                  "three_pt_percent", "fg_percent", "ft_percent", "minutes_played"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

with open("./helper_data/player_game_stats.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    game_id_cache = {}
    player_id_cache = {}

    for game in reader:
        game_args = {
            "date_val": convert_date(game["GAME_DATE"]),
            "team": NBA_TEAMS.get(game["MATCHUP"][:3], "UNKNOWN")
        }

        game_key = (game_args["date_val"], game_args["team"])
        if game_key in game_id_cache:
            game_id = game_id_cache[game_key]
        else:
            game_id = make_query('get_team_id.sql', game_args)
            game_id_cache[game_key] = game_id

        player_args = {"player_name": game["Full Name"] + '%'}

        player_key = game["Full Name"]
        if player_key in player_id_cache:
            player_id = player_id_cache[player_key]
        else:
            player_id = make_query('get_player_id.sql', player_args)
            player_id_cache[player_key] = player_id

        if not game_id or not player_id:
            print(f"Skipping game {game_args} or player {player_args} due to missing IDs.")
            continue

        entry = {
            "player_id": player_id[0][0],
            "game_id": game_id[0][0],
            "points": game["PTS"],
            "assists": game["AST"],
            "rebounds": game["REB"],
            "blocks": game["BLK"],
            "steals": game["STL"],
            "turnovers": game["TOV"],
            "fg_attempts": game["FGA"],
            "three_pt_attempts": game["FG3A"],
            "three_pt_percent": game["FG3_PCT"],
            "fg_percent": game["FG_PCT"],
            "ft_percent": game["FT_PCT"],
            "minutes_played": game["MIN"]
        }

        with open(output_csv, "a", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writerow(entry)

        print("Successfully wrote:", entry)