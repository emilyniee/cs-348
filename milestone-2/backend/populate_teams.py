import csv
from basketball_reference_web_scraper.http_service import HTTPService
from basketball_reference_web_scraper.parser_service import ParserService

# Initialize the HTTP service with a ParserService instance.
http_service = HTTPService(parser=ParserService())

# Specify the season end year (e.g. 2019 represents the 2018-2019 season).
season_end_year = 2024

# Fetch the standings; each record is a dictionary with keys such as "team" and "conference".
standings_data = http_service.standings(season_end_year=season_end_year)

# Create a CSV file with the custom columns: id, team_name, and conference.
with open("teams.csv", mode="w", newline="") as csvfile:
    fieldnames = ["id", "conference"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    # Enumerate over the standings data to assign an auto-incrementing ID.
    for idx, team_record in enumerate(standings_data, start=1):
        # team_record["team"] and team_record["conference"] are enum members.
        writer.writerow({
            "id": f"\"{team_record['team'].value}\"",
            "conference":f"\"{team_record['conference'].value}\"",
        })

print("CSV file 'active_teams.csv' generated successfully.")