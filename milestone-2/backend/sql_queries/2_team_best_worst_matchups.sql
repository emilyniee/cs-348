WITH all_games AS (
    SELECT 
        away_team_name AS opponent_team, 
        home_score - away_score AS point_diff
    FROM Game
    WHERE home_team_name = %(team_name)s
    UNION ALL
    SELECT 
        home_team_name AS opponent_team, 
        away_score - home_score AS point_diff
    FROM Game
    WHERE away_team_name = %(team_name)s
),
aggregated AS (
    SELECT 
        opponent_team, 
        AVG(point_diff) AS avg_point_diff
    FROM all_games
    GROUP BY opponent_team
)
(
    SELECT opponent_team, avg_point_diff
    FROM aggregated
    ORDER BY avg_point_diff DESC
    FETCH FIRST 3 ROWS ONLY
)
UNION ALL
(
    SELECT opponent_team, avg_point_diff
    FROM aggregated
    ORDER BY avg_point_diff ASC
    FETCH FIRST 3 ROWS ONLY
);