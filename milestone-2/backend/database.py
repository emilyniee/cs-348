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


# def get_table_name(table_name):
#     """Query users from table"""
#     with get_conn() as conn:
#         with conn.cursor() as cursor:
#             cursor.execute(f"SELECT * FROM {table_name};")
#             results = cursor.fetchall()
#             return results

    

def get_roster_stats_sql():
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute(f"""SELECT player_id, name, avg_points FROM ((SELECT P.player_id, avg(points) as avg_points FROM
                            (
                            SELECT * FROM (Teams JOIN Rosters ON Teams.team_id=Rosters.team_id AND Rosters.season='2023' AND Teams.team_id='1') as TeamRosters
                                JOIN
                            RosterMembers ON TeamRosters.roster_id=RosterMembers.roster_id
                            ) AS P
                            JOIN
                            (
                            SELECT * FROM Game
                                JOIN
                            PlayerStats ON ((Game.home_team_id='1' OR Game.away_team_id='1') AND Game.game_id=PlayerStats.game_id AND Game.season='2023')
                            ) AS StatsPerGames
                            ON P.player_id=StatsPerGames.player_id GROUP BY P.player_id)) NATURAL JOIN Player;""")
            results = cursor.fetchall()
            return results


def get_team_best_worst_matchup_sql():
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute(f"""WITH
                    team_home AS (
                        SELECT
                            away_team_id AS opponent_team,
                            home_score - away_score AS point_diff
                        FROM
                            Game
                        WHERE
                            home_team_id = '1'
                    ),
                    team_away AS (
                        SELECT
                            home_team_id AS opponent_team,
                            away_score - home_score AS point_diff
                        FROM
                            Game
                        WHERE
                            away_team_id = '1'
                    ),
                    all_games AS (
                        SELECT
                            opponent_team,
                            point_diff
                        FROM
                            team_home
                        UNION ALL
                        SELECT
                            opponent_team,
                            point_diff
                        FROM
                            team_away
                    )
                SELECT
                    opponent_team,
                    avg_point_diff
                FROM
                    (
                        (
                            SELECT
                                opponent_team,
                                AVG(point_diff) AS avg_point_diff
                            FROM
                                all_games
                            GROUP BY
                                opponent_team
                            ORDER BY
                                avg_point_diff DESC
                            FETCH FIRST
                                3 ROWS ONLY
                        )
                        UNION ALL
                        (
                            SELECT
                                opponent_team,
                                AVG(point_diff) AS avg_point_diff
                            FROM
                                all_games
                            GROUP BY
                                opponent_team
                            ORDER BY
                                avg_point_diff ASC
                            FETCH FIRST
                                3 ROWS ONLY
                        )
                    );

                        """)
            results = cursor.fetchall()
            return results

def get_leaderboards_sql():
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute(f"""SELECT p.player_id, p.name, AVG(ps.points) AS avg_points FROM Player p JOIN PlayerStats ps ON p.player_id = ps.player_id GROUP BY p.player_id, p.name ORDER BY avg_points DESC;""")
            results = cursor.fetchall()
            return results


        
def get_arena_stats_sql():
   with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute(f"""WITH HomeStats AS (
                            SELECT 
                                g.home_team_id, 
                                COUNT(*) AS total_games,
                                SUM(CASE WHEN g.home_score > g.away_score THEN 1 ELSE 0 END) AS wins
                            FROM Game g
                            JOIN Arenas a ON g.arena_id = a.arena_id
                            WHERE a.arena_name = 'Michigan Arena'
                            GROUP BY g.home_team_id
                        ),

                        AwayStats AS (
                            SELECT 
                                g.away_team_id, 
                                COUNT(*) AS total_games,
                                SUM(CASE WHEN g.away_score > g.home_score THEN 1 ELSE 0 END) AS wins
                            FROM Game g
                            JOIN Arenas a ON g.arena_id = a.arena_id
                            WHERE a.arena_name = 'Michigan Arena'
                            GROUP BY g.away_team_id
                        ),

                        TopAwayTeams AS (
                            SELECT 
                                a.away_team_id,
                                t.name AS team_name,
                                (a.wins * 100.0 / a.total_games) AS win_percentage,
                                RANK() OVER (ORDER BY (a.wins * 100.0 / a.total_games) DESC) AS rank
                            FROM AwayStats a
                            JOIN Teams t ON a.away_team_id = t.team_id
                        )

                        SELECT 
                            'Home Team' AS category,
                            t.name AS team_name,
                            (h.wins * 100.0 / h.total_games) AS win_percentage
                        FROM HomeStats h
                        JOIN Teams t ON h.home_team_id = t.team_id

                        UNION ALL

                        SELECT 
                            'Top Away Team' AS category,
                            ta.team_name,
                            ta.win_percentage
                        FROM TopAwayTeams ta
                        WHERE ta.rank <= 3

                        ORDER BY category, win_percentage DESC;
                        """)
            results = cursor.fetchall()
            return results