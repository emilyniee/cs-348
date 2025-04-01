from fastapi import FastAPI, Query
import os
from database import init, make_query, execute_prepared_query

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
    res = execute_prepared_query('1_roster_stats_production.sql', {
        'season': "2023-2024",
        'team_name': 'BOSTON CELTICS'
    })
    return res

@app.get('/team_best_worst_matchup')
def get_team_best_worst_matchup(teamName: str = Query(..., description="Team name")):
    res = execute_prepared_query('2_team_best_worst_matchups_production.sql', {
       'team_name': teamName
    })
    return res

@app.get("/leaderboards")
def get_leaderboards():
    res = execute_prepared_query('3_leaderboards_production_use_view.sql')
    return res

@app.get('/arena_stats')
def get_arena_stats():
    res = execute_prepared_query('4_arena_stats_production.sql', {
      'arena_name': 'State Farm Arena'
    })
    return res

@app.get('/birthdays')
def get_birthdays(month: str = Query(..., description="MM"), day: str = Query(..., description="DD")):
    res = execute_prepared_query('5_birthdays_production.sql', {
      'bday_month': month,
      'bday_day': day
    })
    return res

@app.get('/longest_win_streaks')
def get_longest_win_streaks():
    res = execute_prepared_query('7_longest_win_streaks_production.sql', {
      'season': '2023-2024'
    })
    return res

@app.get("/best_benchwarmers")
def get_benchwarmers():
    res = execute_prepared_query('10_best_benchwarmers_production.sql')
    return res
