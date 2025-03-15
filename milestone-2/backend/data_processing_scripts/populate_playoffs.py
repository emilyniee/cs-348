import requests
import re
from lxml import html
import csv

url = "https://www.basketball-reference.com/playoffs/NBA_2024.html"
response = requests.get(url)
response.raise_for_status()

doc = html.fromstring(response.content)

container = doc.xpath('//div[@id="content"]')
if container:
    content = container[0].text_content()
else:
    content = doc.text_content()

lines = [line.strip() for line in content.splitlines() if line.strip()]

matchup_lines = [line for line in lines if " vs. " in line]

print("Extracted matchup lines:")
for line in matchup_lines:
    print(line)

season_end_year = 2024
season_str = f"{season_end_year - 1}-{season_end_year}"

def get_round_label(index):
    """
    Returns the series label based on the index of the matchup.
    Assumes:
      - First 8 matchups (index 0-7) are Quarterfinals,
      - Next 4 (index 8-11) are Semifinals,
      - Next 2 (index 12-13) are Finals,
      - Last one (index 14 and above) is Championship Finals.
    """
    if index < 8:
        return "Quarterfinals"
    elif index < 12:
        return "Semifinals"
    elif index < 14:
        return "Finals"
    else:
        return "Championship Finals"

with open("playoffs.csv", mode="w", newline="") as csvfile:
    fieldnames = ["playoff_id", "team_name1", "team_name2", "series", "season"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    playoff_id = 1
    for idx, matchup in enumerate(matchup_lines):
        parts = matchup.split(" vs. ")
        if len(parts) != 2:
            continue
        team1 = parts[0].strip()
        team2 = parts[1].strip()
        series = get_round_label(idx)
        
        writer.writerow({
            "playoff_id": playoff_id,
            "team_name1": f'"{team1.upper()}"',
            "team_name2": f'"{team2.upper()}"',
            "series": f'"{series}"',
            "season": season_str
        })
        playoff_id += 1

print("CSV file 'playoffs.csv' generated successfully.")
