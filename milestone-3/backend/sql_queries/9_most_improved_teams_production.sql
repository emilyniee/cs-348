WITH FirstHalf AS (
    SELECT * 
    FROM Game
    ORDER BY "date" ASC
    LIMIT (SELECT FLOOR(COUNT(*) / 2) FROM Game)
),
SecondHalf AS (
    SELECT * 
    FROM Game
    ORDER BY "date" ASC
    OFFSET (SELECT FLOOR(COUNT(*) / 2) FROM Game)
),
FirstHalfWins AS (
    SELECT team, SUM(wins) AS wins
    FROM (
        SELECT home_team_name AS team, COUNT(*) AS wins
        FROM FirstHalf WHERE home_score > away_score
        GROUP BY home_team_name
        UNION ALL
        SELECT away_team_name AS team, COUNT(*) AS wins
        FROM FirstHalf WHERE away_score > home_score
        GROUP BY away_team_name
    ) AS combined
    GROUP BY team
),
FirstHalfGames AS (
    SELECT team, SUM(total_games) AS total_games
    FROM (
        SELECT home_team_name AS team, COUNT(*) AS total_games
        FROM FirstHalf 
        GROUP BY home_team_name
        UNION ALL
        SELECT away_team_name AS team, COUNT(*) AS total_games
        FROM FirstHalf 
        GROUP BY away_team_name
    ) AS combined
    GROUP BY team
),
SecondHalfWins AS (
    SELECT team, SUM(wins) AS wins
    FROM (
        SELECT home_team_name AS team, COUNT(*) AS wins
        FROM SecondHalf WHERE home_score > away_score
        GROUP BY home_team_name
        UNION ALL
        SELECT away_team_name AS team, COUNT(*) AS wins
        FROM SecondHalf WHERE away_score > home_score
        GROUP BY away_team_name
    ) AS combined
    GROUP BY team
),
SecondHalfGames AS (
    SELECT team, SUM(total_games) AS total_games
    FROM (
        SELECT home_team_name AS team, COUNT(*) AS total_games
        FROM SecondHalf 
        GROUP BY home_team_name
        UNION ALL
        SELECT away_team_name AS team, COUNT(*) AS total_games
        FROM SecondHalf 
        GROUP BY away_team_name
    ) AS combined
    GROUP BY team
)
SELECT 
    FirstHalfWins.team,
    FirstHalfWins.wins,
    FirstHalfGames.total_games,
    FirstHalfWins.wins / FirstHalfGames.total_games as first_pct,
    SecondHalfWins.wins,
    SecondHalfGames.total_games,
    SecondHalfWins.wins / SecondHalfGames.total_games as second_pct,
    SecondHalfWins.wins / SecondHalfGames.total_games - FirstHalfWins.wins / FirstHalfGames.total_games as pct_improvement
FROM FirstHalfWins
NATURAL JOIN FirstHalfGames
JOIN SecondHalfWins ON SecondHalfWins.team = FirstHalfGames.team
JOIN SecondHalfGames ON SecondHalfGames.team = SecondHalfWins.team
ORDER BY pct_improvement DESC;