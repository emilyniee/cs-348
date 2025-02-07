from fastapi import FastAPI
import os
from database import init, get_all_players, populate_sql_tables

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/players")
def get_players():
    users = get_all_players()
    return {"players": users}

@app.get("/populate")
def populate_table_endpoint():
    """
    An endpoint to populate the given table from a CSV file.
    
    The CSV file is expected to reside in the ./data/ directory
    and be named <table_name>.csv.
    """
    csv_path = f"./data/players.csv"
    if not os.path.exists(csv_path):
        return {"error": f"CSV file not found at {csv_path}"}
    result = populate_sql_tables("positions", csv_path)
    result = populate_sql_tables("teams", csv_path)
    result = populate_sql_tables("players", csv_path)


    return {"result": result}
