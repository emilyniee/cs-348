

import csv
from datetime import datetime
from database import init, make_query

def convert_date(date_str):
    """Convert date string from 'April 10, 2024' to 'YYYY-MM-DD'."""
    try:
        dt = datetime.strptime(date_str, "%B %d, %Y")  # Convert from text format
        return dt.strftime("%Y-%m-%d")  # Convert to 'YYYY-MM-DD'
    except ValueError:
        return date_str  # Return original if conversion fails
    

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
missing_games_csv = "./data/missing_games.csv"
missing_players_csv = "./data/missing_players.csv"

# Ensure missing_games.csv has headers
with open(missing_games_csv, "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["date_val", "team"])
    writer.writeheader()  # Write headers once


with open(missing_players_csv, "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["player_name"])
    writer.writeheader()  # Write headers once


with open(output_csv, "w", newline="", encoding="utf-8") as file:
    fieldnames = ["player_id", "game_id", "points", "assists", "rebounds", "blocks", 
                  "steals", "turnovers", "fg_attempts", "three_pt_attempts", 
                  "three_pt_percent", "fg_percent", "ft_percent", "minutes_played"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

# Now process CSV row-by-row and write each entry immediately
with open("./populate_script/player_game_stats.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    # Cache for repeated database queries
    game_id_cache = {}
    player_id_cache = {}
    missing_games_set = set()
    missing_players_set = set()

    for game in reader:
        game_args = {
            "date_val": convert_date(game["GAME_DATE"]),
            "team": NBA_TEAMS.get(game["MATCHUP"][:3], "UNKNOWN")
        }

        # **Use Cache for game_id**
        game_key = (game_args["date_val"], game_args["team"])
        if game_key in game_id_cache:
            game_id = game_id_cache[game_key]
        else:
            game_id = make_query('get_team_id.sql', game_args)
            game_id_cache[game_key] = game_id  # Cache it

        player_args = {"player_name": game["Full Name"] + '%'}

        # **Use Cache for player_id**
        player_key = game["Full Name"]
        if player_key in player_id_cache:
            player_id = player_id_cache[player_key]
        else:
            player_id = make_query('get_player_id.sql', player_args)

            if not player_id:
                if player_key not in missing_players_set:  # Avoid duplicates
                    with open(missing_players_csv, "a", newline="", encoding="utf-8") as file:
                        writer = csv.DictWriter(file, fieldnames=["player_name"])
                        writer.writerow({"player_name": player_key})  # Write missing player
                    missing_players_set.add(player_key)  # Track written players

                print(f"Missing player: {player_args}")
                continue  # Skip this entry
            else:
                player_id_cache[player_key] = player_id  # Cache it


        if not game_id:
            if game_key not in missing_games_set:  # Avoid duplicates
                with open(missing_games_csv, "a", newline="", encoding="utf-8") as file:
                    writer = csv.DictWriter(file, fieldnames=["date_val", "team"])
                    writer.writerow(game_args)  # Write missing game
                missing_games_set.add(game_key)  # Track written games

            print(f"Missing game: {game_args}")
            continue  # Skip this entry

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

        # Append to CSV file immediately
        with open(output_csv, "a", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writerow(entry)

        print("Successfully wrote:", entry)