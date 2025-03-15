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
            special_tables_csv = {
                "Teams": "data/teams.csv",
                "Arenas" : "data/arena.csv",
                "Playoffs" : "data/playoffs.csv",
                "Player": "data/player.csv",
                "Game": "data/game.csv",
                "Rosters": "data/roster.csv",
                 "RosterMembers": "data/rostermembers.csv",
                "GameSeries": "data/gameseries.csv",
                "PlayerStats": "data/playerStats.csv",
                "TeamArenas": "data/teamArena.csv",
            }
            # special_tables_csv = {
            #     "RosterMembers": "data/rostermembers.csv",
            #     "GameSeries": "data/gameseries.csv",
            #     "PlayerStats": "data/playerStats.csv",
            #     "TeamArenas": "data/teamArena.csv",

            # }

            # for table_name, csv_path in tables_csv.items():
            #     with open(csv_path, 'r', encoding='utf-8') as csv_file:
            #         all_lines = csv_file.readlines()
            #         for l in all_lines[1:]:
            #             l = l.strip().replace("'", "").replace('"', "'").split(',')
            #             l[0] = "DEFAULT"
            #             l = ",".join(l)
            #             sql_query = f"INSERT INTO {table_name} VALUES ({l});"
            #             print(sql_query)
            #             cursor.execute(sql_query)
            #     print(f"Data inserted into {table_name} successfully. Sample rows:")

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



def execute_query(query):
  """
  Executes SQL query

  :param query: The exact SQL that we execute on the database 
  :return: Any response from the SQL command
  """
  conn = get_conn()
  cursor = conn.cursor()

  try:
    cursor.execute(query)
    conn.commit()
    res = cursor.fetchall()
  except Exception as e:
    # conn.rollback()
    res = f"An error occured: {e}"
  finally:
    cursor.close()
    conn.close()
    return res

def format_sql(template, args = {}):
  """
  Replace the placeholder values in a SQL template

  :template: The SQL template string with placeholders in the form ${placeholder}
  :args: A dictionary containing the values for the template
  :return: The formatted SQL string
  """
  formatted_sql = template

  for key, value in args.items():
      placeholder = '${' + key + '}'
      if isinstance(value, str):
          value = f"'{value}'"
      formatted_sql = formatted_sql.replace(placeholder, str(value))

  return formatted_sql

def make_query(query, args = {}):
  """
  Makes SQL query and inputs arguments into template

  :query: SQL file of the template SQL query
  :args: A dictionary containing the values for the template
  """
  with open('./sql_queries/'+query, 'r') as sql_file:
    sql_query = sql_file.read()
  
  sql_query = format_sql(sql_query, args)

  if '$' in sql_query:
    return "Error: Missing parameters"

  try:
    res = execute_query(sql_query)
    
  except Exception as e:
    res = f"An error occured: {e}"
  finally:
    return res



def execute_prepared_query(query, args = {}):
  with open('./sql_queries/'+query, 'r') as sql_file:
    sql_query = sql_file.read()
  
  with get_conn() as conn:
     with conn.cursor() as cursor:
        cursor.execute(sql_query, args)
        res = cursor.fetchall()
  return res