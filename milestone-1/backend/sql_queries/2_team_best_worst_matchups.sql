WITH team_home AS (
   SELECT
       away_team AS opponent_team,
       home_score - away_score AS point_diff
   FROM Game
   WHERE home_team = ${team_id}
),
team_away AS (
   SELECT
       home_team AS opponent_team,
       away_score - home_score AS point_diff
   FROM Game
   WHERE away_team = ${team_id}
),
all_games AS (
   SELECT opponent_team, point_diff FROM team_home
   UNION ALL
   SELECT opponent_team, point_diff FROM team_away
)


SELECT name, opponent_team, avg_point_diff FROM
((
   SELECT
       opponent_team,
       AVG(point_diff) AS avg_point_diff
   FROM all_games
   GROUP BY opponent_team
   ORDER BY avg_point_diff DESC
   FETCH FIRST 3 ROWS ONLY
)
   UNION ALL
(
   SELECT
       opponent_team,
       AVG(point_diff) AS avg_point_diff
   FROM all_games
   GROUP BY opponent_team
   ORDER BY avg_point_diff ASC
   FETCH FIRST 3 ROWS ONLY
)) JOIN Teams ON Teams.team_id=opponent_team;
