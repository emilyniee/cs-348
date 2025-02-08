import os
import psycopg2
import csv
DATABASE_URL = os.getenv("DATABASE_URL")

def get_conn():
    """Get a psycopg2 connection using the DATABASE_URL."""
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not set")
    return psycopg2.connect(DATABASE_URL)

def init():
    """Create tables and insert initial data using an SQL file."""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            with open('./sql_queries/create_tables.sql', 'r', encoding='utf-8') as f:
                sql_script = f.read()     
            cursor.execute(sql_script)
        conn.commit()
    
    populate()
def populate():
    """Create tables and insert initial data using an SQL file."""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            tables_csv = {
                "Teams": "data/teams.csv",
                "Arenas" : "data/arena.csv",
                "Playoffs" : "data/playoffs.csv",
                "Player": "data/player.csv",
                "Game": "data/game.csv",
                "Rosters": "data/roster.csv",
            }
            special_tables_csv = {
                "RosterMembers": "data/rostermembers.csv",
                "GameSeries": "data/gameseries.csv",
                "PlayerStats": "data/playerStats.csv",
                "TeamArenas": "data/teamArena.csv",

            }

            for table_name, csv_path in tables_csv.items():
                with open(csv_path, 'r', encoding='utf-8') as csv_file:
                    all_lines = csv_file.readlines()
                    for l in all_lines[1:]:
                        l = l.strip().replace("'", "").replace('"', "'").split(',')
                        l[0] = "DEFAULT"
                        l = ",".join(l)
                        sql_query = f"INSERT INTO {table_name} VALUES ({l});"
                        print(sql_query)
                        cursor.execute(sql_query)
                print(f"Data inserted into {table_name} successfully. Sample rows:")

            for table_name, csv_path in special_tables_csv.items():
                with open(csv_path, 'r', encoding='utf-8') as csv_file:
                    all_lines = csv_file.readlines()
                    for l in all_lines[1:]:
                        l = l.strip().replace("'", "").replace('"', "'")
                        sql_query = f"INSERT INTO {table_name} VALUES ({l});"
                        print(sql_query)
                        cursor.execute(sql_query)
        conn.commit()
    print("Database tables created/updated successfully.")


def get_table_name(table_name):
    """Query users from table"""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT * FROM {table_name};")
            results = cursor.fetchall()
            return results

    
