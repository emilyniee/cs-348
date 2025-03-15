import csv
from datetime import datetime
from basketball_reference_web_scraper.http_service import HTTPService
from basketball_reference_web_scraper.parser_service import ParserService
from basketball_reference_web_scraper.data import Team
import requests
import re
from lxml import html
from datetime import datetime
import pytz
http_service = HTTPService(parser=ParserService())
utc=pytz.UTC

# Specify the season end year.
season_end_year = 2024

# Fetch standings data (which returns a list of dicts with a "team" key as a Team enum)
standings_data = http_service.standings(season_end_year=season_end_year)

# Build a mapping from each team (Team enum) to its team name (string).
teams_mapping = {}
for record in standings_data:
    team_enum = record["team"]
    teams_mapping[team_enum] = team_enum.value
    print(record)
print("Number of teams:", len(teams_mapping))

arena_mapping = {}
with open("milestone-2/backend/data/teamArena.csv", mode="r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        csv_team_name = row["team_name"].strip()
        csv_arena_name = row["arena_id"].strip()
        # Find the matching team enum by comparing team names.
        for team_enum, team_name in teams_mapping.items():
            if team_name == csv_team_name:
                arena_mapping[team_enum] = csv_arena_name
                break

print("Number of arena mappings:", len(arena_mapping))

schedule_data = http_service.season_schedule(season_end_year=season_end_year)


with open("game.csv", mode="w", newline="") as csvfile:
    fieldnames = [
        "game_id", "home_team_id", "away_team_id",
        "season", "date", "is_playoff",
        "home_score", "away_score", "arena_id"
    ]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    game_id_counter = 1
    # Define the season string (e.g., "2018-2019")
    season_str = f"{season_end_year - 1}-{season_end_year}"
    is_playoff = False
    for game in schedule_data:
        
        # Extract and format the date from the start_time.
        start_time = game["start_time"]

        date_str = start_time.strftime("%Y-%m-%d") if hasattr(start_time, "strftime") else str(start_time)

        playoff_date = datetime.strptime("2024-04-20", "%Y-%m-%d")
        is_playoff = start_time > utc.localize(playoff_date)

        home_team = game["home_team"]
        away_team = game["away_team"]
        home_team_id = teams_mapping.get(home_team)
        away_team_id = teams_mapping.get(away_team)
        
        # Lookup arena "ID" (which is the arena name) using the home team.
        arena_id = arena_mapping.get(home_team)
                
        writer.writerow({
            "game_id": game_id_counter,
            "home_team_id": f'"{home_team_id}"',
            "away_team_id": f'"{away_team_id}"',
            "season": f'"{season_str}"',
            "date": f'"{date_str}"',
            "is_playoff": is_playoff,
            "home_score": game["home_team_score"],
            "away_score": game["away_team_score"],
            "arena_id": f'"{arena_id}"',
        })
        game_id_counter += 1

print("CSV file 'game.csv' generated successfully.")