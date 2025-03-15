import csv
from basketball_reference_web_scraper.http_service import HTTPService
from basketball_reference_web_scraper.parser_service import ParserService

http_service = HTTPService(parser=ParserService())

season_end_year = 2024
standings_data = http_service.standings(season_end_year=season_end_year)

with open("teams.csv", mode="w", newline="") as csvfile:
    fieldnames = ["id", "conference"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for idx, team_record in enumerate(standings_data, start=1):
        writer.writerow({
            "id": f"\"{team_record['team'].value}\"",
            "conference":f"\"{team_record['conference'].value}\"",
        })

print("CSV file 'active_teams.csv' generated successfully.")