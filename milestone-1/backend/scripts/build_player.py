import csv
from basketball_reference_web_scraper import client

def format_field(key, value, numeric_fields: set):
    """
    Returns the string representation of the field:
      - If the key is in numeric_fields and the value can be cast to a float,
        then return it as is (no surrounding quotes).
      - Otherwise, return the value enclosed in double quotes.
    """
    # If value is None, output empty string
    if value is None:
        return ""
    
    # For numeric fields, try to return the numeric value (if possible)
    if key in numeric_fields:
        try:
            # Attempt conversion; if successful, return the string representation.
            float(value)
            return str(value)
        except (ValueError, TypeError):
            # If conversion fails (for example, "N/A"), treat as text.
            return f'"{value}"'
    else:
        # For text fields, always enclose in double quotes.
        return f'"{value}"'

def write_players_csv(season_end_year, output_csv_path):
    """
    Creates a players.csv file with one row per player from season totals.
    
    Only TEXT-based columns are enclosed in double quotes.
    """
    try:
        # Fetch season totals for all players for the given season.
        players = client.players_season_totals(season_end_year=season_end_year)
    except Exception as e:
        print(f"Error fetching season totals: {e}")
        return

    # Define the field order.
    fieldnames = [
        "player_id",
        "name",
        "age",
        "position_id",
        "avg_points",
        "avg_assists",
        "avg_rebounds",
        "team_id"
    ]
    
    # Define which fields should be treated as numeric.
    numeric_fields = {"age", "avg_points", "avg_assists", "avg_rebounds"}

    # Open the CSV file for writing.
    with open(output_csv_path, mode='w', newline='', encoding='utf-8') as csvfile:
        # Write header (you can choose whether to quote header names or not)
        csvfile.write(",".join(fieldnames) + "\n")
        
        for p in players:
            # Build the row dictionary.
            row = {}
            # Use the "slug" as the player_id.
            row["player_id"] = p.get("slug", "N/A")
            row["name"] = p.get("name", "N/A")
            row["age"] = p.get("age", "N/A")
            # For the position, use the first value in "positions" if it is a list.
            positions = p.get("positions", "N/A")
            if isinstance(positions, list):
                row["position_id"] = positions[0] if positions else "N/A"
            else:
                row["position_id"] = positions
            row["team_id"] = p.get("team", "N/A")

            games_played = p.get("games_played", 0)
            total_points = p.get("points", 0)
            total_assists = p.get("assists", 0)
            # Compute total rebounds as the sum of offensive and defensive rebounds.
            total_rebounds = p.get("offensive_rebounds", 0) + p.get("defensive_rebounds", 0)

            row["avg_points"] = round(total_points / games_played, 1) if games_played else 0
            row["avg_assists"] = round(total_assists / games_played, 1) if games_played else 0
            row["avg_rebounds"] = round(total_rebounds / games_played, 1) if games_played else 0

            # Format each field according to its type.
            formatted_fields = [format_field(key, row.get(key), numeric_fields) for key in fieldnames]
            # Write the CSV row.
            csvfile.write(",".join(formatted_fields) + "\n")

    print(f"Players data successfully written to {output_csv_path}")

def write_locations_csv(day, month, year, output_csv_path):
    """
    Creates a locations.csv file using the player box scores for a given day.
    
    For this example, we'll treat the following fields as numeric:
      seconds_played, made_field_goals, attempted_field_goals,
      made_three_point_field_goals, attempted_three_point_field_goals,
      made_free_throws, attempted_free_throws, offensive_rebounds,
      defensive_rebounds, assists, steals, blocks, turnovers, personal_fouls,
      game_score, plus_minus
      
    All others (such as player_id, name, team, location, opponent, outcome, date) are TEXT.
    """
    try:
        # Fetch the box scores for the given date.
        box_scores = client.player_box_scores(day=day, month=month, year=year)
    except Exception as e:
        print(f"Error fetching player box scores: {e}")
        return

    fieldnames = [
        "player_id",  # from "slug"
        "name",
        "team",
        "location",
        "opponent",
        "outcome",
        "seconds_played",
        "made_field_goals",
        "attempted_field_goals",
        "made_three_point_field_goals",
        "attempted_three_point_field_goals",
        "made_free_throws",
        "attempted_free_throws",
        "offensive_rebounds",
        "defensive_rebounds",
        "assists",
        "steals",
        "blocks",
        "turnovers",
        "personal_fouls",
        "game_score",
        "plus_minus",
        "date"
    ]
    
    # Define numeric fields for locations.
    numeric_fields = {
        "seconds_played", "made_field_goals", "attempted_field_goals",
        "made_three_point_field_goals", "attempted_three_point_field_goals",
        "made_free_throws", "attempted_free_throws", "offensive_rebounds",
        "defensive_rebounds", "assists", "steals", "blocks", "turnovers",
        "personal_fouls", "game_score", "plus_minus"
    }

    # Build the date string.
    date_str = f"{year}-{month:02d}-{day:02d}"

    with open(output_csv_path, mode='w', newline='', encoding='utf-8') as csvfile:
        # Write header (without added quotes)
        csvfile.write(",".join(fieldnames) + "\n")
        for row in box_scores:
            # Build a row dictionary mapping our fieldnames.
            data = {
                "player_id": row.get("slug", "N/A"),
                "name": row.get("name", "N/A"),
                "team": row.get("team", "N/A"),
                "location": row.get("location", "N/A"),
                "opponent": row.get("opponent", "N/A"),
                "outcome": row.get("outcome", "N/A"),
                "seconds_played": row.get("seconds_played", "N/A"),
                "made_field_goals": row.get("made_field_goals", "N/A"),
                "attempted_field_goals": row.get("attempted_field_goals", "N/A"),
                "made_three_point_field_goals": row.get("made_three_point_field_goals", "N/A"),
                "attempted_three_point_field_goals": row.get("attempted_three_point_field_goals", "N/A"),
                "made_free_throws": row.get("made_free_throws", "N/A"),
                "attempted_free_throws": row.get("attempted_free_throws", "N/A"),
                "offensive_rebounds": row.get("offensive_rebounds", "N/A"),
                "defensive_rebounds": row.get("defensive_rebounds", "N/A"),
                "assists": row.get("assists", "N/A"),
                "steals": row.get("steals", "N/A"),
                "blocks": row.get("blocks", "N/A"),
                "turnovers": row.get("turnovers", "N/A"),
                "personal_fouls": row.get("personal_fouls", "N/A"),
                "game_score": row.get("game_score", "N/A"),
                "plus_minus": row.get("plus_minus", "N/A"),
                "date": date_str,
            }
            formatted_fields = [format_field(key, data.get(key), numeric_fields) for key in fieldnames]
            csvfile.write(",".join(formatted_fields) + "\n")

    print(f"Locations data successfully written to {output_csv_path}")

if __name__ == '__main__':
    # Produce players.csv from season totals (for example, season ending in 2023).
    write_players_csv(season_end_year=2023, output_csv_path='players.csv')
    # Produce locations.csv using box scores for January 1, 2023.
    write_locations_csv(day=1, month=1, year=2023, output_csv_path='locations.csv')
