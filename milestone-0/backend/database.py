import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")

def get_conn():
    """Get psycopg2 connection"""
    conn = psycopg2.connect(DATABASE_URL)
    return conn

def init():
    """Create a table and insert data"""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            with open('./sql_queries/users.sql', 'r') as f:
                user_query = f.read()
            cursor.execute(user_query)
        conn.commit()

def get_all_users():
    """Query users from table"""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users;")
            results = cursor.fetchall()
            return results