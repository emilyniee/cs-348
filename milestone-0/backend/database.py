import os
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    """Returns a psycopg2 connection"""
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

def init_db():
    """Create a table and insert data"""
    with get_connection() as conn:
        with conn.cursor() as cursor:
            with open('./sql_queries/users.sql', 'r') as f:
                user_query = f.read()
            cursor.execute(user_query)

        conn.commit()

def get_all_users():
    """Query all users from table."""
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users;")
            results = cursor.fetchall()
            return results