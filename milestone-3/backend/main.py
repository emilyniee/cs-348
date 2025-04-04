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
def get_roster_stats(teamName: str = Query(..., description="Team name")):
    res = execute_prepared_query('1_roster_stats_production.sql', {
        'season': "2023-2024",
        'team_name': teamName
    })
    return res

@app.get('/team_names')
def get_team_names():
    res = execute_prepared_query('2_team_names.sql')
    return res

@app.get('/team_best_worst_matchup')
def get_team_best_worst_matchup(teamName: str = Query(..., description="Team name")):
    res = execute_prepared_query('2_team_best_worst_matchups_production.sql', {
       'team_name': teamName
    })
    return res


STAT_QUERIES = {
    "pts": "3_leaderboards_production_pts.sql",
    "assists": "3_leaderboards_production_assists.sql",
    "rebounds": "3_leaderboards_production_rebounds.sql",
    "steals": "3_leaderboards_production_steals.sql",
    "blocks": "3_leaderboards_production_blocks.sql",
    "fg": "3_leaderboards_production_fg_percentage.sql",
    "3pt": "3_leaderboards_production_3pt_percentage.sql"
}

@app.get("/leaderboards")
def get_leaderboards(stat: str = Query(..., description="Stat type (e.g., pts, assists, rebounds, etc.)")):
    if stat not in STAT_QUERIES:
        return {"error": "Invalid stat type. Choose from: " + ", ".join(STAT_QUERIES.keys())}

    query_file = STAT_QUERIES[stat]
    res = execute_prepared_query(query_file)
    return res

@app.get('/arena_names')
def get_arena_names():
    res = execute_prepared_query('4_arena_names.sql')
    return res

@app.get('/arena_stats')
def get_arena_stats(arenaName: str = Query(..., description="Arena name")):
    res = execute_prepared_query('4_arena_stats_production.sql', {
      'arena_name': arenaName
    })
    return res

@app.get('/birthdays')
def get_birthdays(month: str = Query(..., description="MM"), day: str = Query(..., description="DD")):
    res = execute_prepared_query('5_birthdays_production.sql', {
      'bday_month': month,
      'bday_day': day
    })
    return res

@app.get('/position_comparison')
def get_position_comparison():
    res = execute_prepared_query('6_position_comparison_production.sql')
    return res
    
@app.get('/longest_win_streaks')
def get_longest_win_streaks():
    res = execute_prepared_query('7_longest_win_streaks_production.sql', {
      'season': '2023-2024'
    })
    return res

@app.get("/most_triple_doubles")
def most_triple_doubles():
    res = execute_prepared_query('8_most_triple_doubles.sql')
    return res

@app.get("/best_benchwarmers")
def get_benchwarmers(threshold_minute: str = Query(..., description="Threshold Minute")):
    res = execute_prepared_query('10_best_benchwarmers_production.sql',{
        'threshold_minute': threshold_minute
    })
    return res


@app.get('/most_improved_teams')
def get_most_improved_teams():
    res = execute_prepared_query('9_most_improved_teams_production.sql')
    return res