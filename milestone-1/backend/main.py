from fastapi import FastAPI
import os
from database import init, get_leaderboards_sql, get_roster_stats_sql, get_team_best_worst_matchup_sql, get_arena_stats_sql

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# @app.get("/{table_name}")
# def get_table(table_name):
#     table = get_table_name(table_name)
#     return {table_name: table}

@app.get('/roster_stats')
def get_roster_stats():
    table = get_roster_stats_sql()
    return table

@app.get('/team_best_worst_matchup')
def get_team_best_worst_matchup():
    table = get_team_best_worst_matchup_sql()
    return table

@app.get("/leaderboards")
def get_leaderboards():
    table = get_leaderboards_sql()
    return table

@app.get('/arena_stats')
def get_arena_stats():
    table = get_arena_stats_sql()
    return table