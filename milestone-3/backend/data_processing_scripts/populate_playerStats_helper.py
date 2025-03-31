import pandas as pd
from nba_api.stats.static import players
from nba_api.stats.endpoints import playergamelog
import time
import csv

input_csv = "nba_players_usernames.csv" 
output_csv = "player_game_stats.csv" 

players_df = pd.read_csv(input_csv)

all_game_data = []

for index, row in players_df.iterrows():
    player_name = row['Full Name']
    username = row['Username']

    player_info = next((player for player in players.get_active_players() if player['full_name'] == player_name), None)

    if player_info:
        player_id = player_info['id']
        print(f"Fetching game stats for {player_name} ({username})")

        season = "2023-24"  #Example season
        try:
            game_logs = playergamelog.PlayerGameLog(player_id=player_id, season=season)
            game_logs_df = game_logs.get_data_frames()[0]

            game_logs_df['Full Name'] = player_name
            game_logs_df['Username'] = username

            # Append the data to the list
            all_game_data.append(game_logs_df)

            time.sleep(1)

        except Exception as e:
            print(f"Error fetching stats for {player_name}: {e}")
    
    else:
        print(f"Player {player_name} not found!")

final_df = pd.concat(all_game_data, ignore_index=True)

final_df.to_csv(output_csv, index=False)
print(f"All game stats saved to {output_csv}")
