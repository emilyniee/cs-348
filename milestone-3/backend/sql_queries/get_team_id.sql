SELECT game_id FROM Game 
WHERE "date" = ${date_val} AND (home_team_name = ${team} OR away_team_name = ${team});