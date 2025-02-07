import os
import psycopg2
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
    print("Database tables created/updated successfully.")

def populate_sql_tables(name: str, path_data: str):
    with get_conn() as conn:
        with conn.cursor() as cursor:
            with open(path_data, 'r', encoding='utf-8') as csv_file:
                all_lines = csv_file.readlines()
                for l in all_lines[1:]:
                    l = l.strip().replace('"', "'").replace(r"\N", "NULL")
                    sql_query = f"INSERT INTO {name} VALUES ({l});"
                    cursor.execute(sql_query)
            conn.commit()
            cursor.execute(f"SELECT * FROM {name};")
            results = cursor.fetchall()
    return results

def get_all_players():
    """Query users from table"""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM players;")
            results = cursor.fetchall()
            return results

if __name__ == '__main__':
    init()
    # result = populate_sql_tables("players", "players.csv")
    # print(result)
    
