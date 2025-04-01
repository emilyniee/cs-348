WITH FirstHalf AS (
    SELECT * 
    FROM Game
    ORDER BY "date" ASC
    LIMIT (SELECT COUNT(*) / 2 FROM Game)
),
SecondHalf AS (
    SELECT * 
    FROM Game
    ORDER BY "date" ASC
    OFFSET (SELECT COUNT(*) / 2 FROM Game)
),
FirstHalfWins AS (
    SELECT home_team_name AS team, COUNT(*) AS wins
    FROM FirstHalf WHERE home_score > away_score
    GROUP BY home_team_name
    UNION ALL
    SELECT away_team_name AS team, COUNT(*) AS wins
    FROM FirstHalf WHERE away_score > home_score
    GROUP BY away_team_name
),
FirstHalfGames AS (
    SELECT home_team_name AS team, COUNT(*) AS total_games
    FROM FirstHalf GROUP BY home_team_name
    UNION ALL
    SELECT away_team_name AS team, COUNT(*) AS total_games
    FROM FirstHalf GROUP BY away_team_name
),
SecondHalfWins AS (
    SELECT home_team_name AS team, COUNT(*) AS wins
    FROM SecondHalf WHERE home_score > away_score
    GROUP BY home_team_name
    UNION ALL
    SELECT away_team_name AS team, COUNT(*) AS wins
    FROM SecondHalf WHERE away_score > home_score
    GROUP BY away_team_name
),
SecondHalfGames AS (
    SELECT home_team_name AS team, COUNT(*) AS total_games
    FROM SecondHalf GROUP BY home_team_name
    UNION ALL
    SELECT away_team_name AS team, COUNT(*) AS total_games
    FROM SecondHalf GROUP BY away_team_name
)
SELECT 
    fg.team AS team, 
    SUM(fw.wins) AS first_half_wins,
    SUM(fg.total_games) AS first_half_games,
    (SUM(fw.wins) * 100.0 / SUM(fg.total_games)) AS first_half_win_pct,
    SUM(sw.wins) AS second_half_wins,
    SUM(sg.total_games) AS second_half_games,
    (SUM(sw.wins) * 100.0 / SUM(sg.total_games)) AS second_half_win_pct,
    ((SUM(sw.wins) * 100.0 / SUM(sg.total_games)) - 
     (SUM(fw.wins) * 100.0 / SUM(fg.total_games))) AS win_pct_change
FROM FirstHalfGames fg
LEFT JOIN FirstHalfWins fw ON fg.team = fw.team
LEFT JOIN SecondHalfGames sg ON fg.team = sg.team
LEFT JOIN SecondHalfWins sw ON fg.team = sw.team
GROUP BY fg.team

UNION ALL

SELECT 
    sg.team AS team, 
    SUM(fw.wins) AS first_half_wins,
    SUM(fg.total_games) AS first_half_games,
    (SUM(fw.wins) * 100.0 / SUM(fg.total_games)) AS first_half_win_pct,
    SUM(sw.wins) AS second_half_wins,
    SUM(sg.total_games) AS second_half_games,
    (SUM(sw.wins) * 100.0 / SUM(sg.total_games)) AS second_half_win_pct,
    ((SUM(sw.wins) * 100.0 / SUM(sg.total_games)) - 
     (SUM(fw.wins) * 100.0 / SUM(fg.total_games))) AS win_pct_change
FROM SecondHalfGames sg
LEFT JOIN SecondHalfWins sw ON sg.team = sw.team
LEFT JOIN FirstHalfGames fg ON sg.team = fg.team
LEFT JOIN FirstHalfWins fw ON sg.team = fw.team
WHERE fg.team IS NULL
GROUP BY sg.team

ORDER BY win_pct_change DESC;