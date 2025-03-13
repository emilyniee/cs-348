from fastapi import FastAPI
import os
from database import init, make_query

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


@app.get('/roster_stats')
def get_roster_stats():
    res = make_query('1_roster_stats.sql', {
        'season': "2023",
        'team_id': '1'
    })
    return res

@app.get('/team_best_worst_matchup')
def get_team_best_worst_matchup():
    res = make_query('2_team_best_worst_matchups.sql', {
       'team_id': '1'
    })
    return res

@app.get("/leaderboards")
def get_leaderboards():
    res = make_query('3_leaderboards.sql')
    return res

@app.get('/arena_stats')
def get_arena_stats():
    res = make_query('4_arena_stats.sql', {
      'arena_name': 'Michigan Arena'
    })
    return res