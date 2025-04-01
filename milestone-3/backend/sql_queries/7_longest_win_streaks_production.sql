WITH TeamGames AS (
    SELECT home_team_name AS team_name, season, "date",
            CASE WHEN home_score > away_score THEN 1 ELSE 0 END AS win
    FROM Game
    UNION ALL
    SELECT away_team_name AS team_name, season, "date",
           CASE WHEN away_score > home_score THEN 1 ELSE 0 END AS win
    FROM Game
),
Ordered AS (
    SELECT team_name, season, "date", win,
           ROW_NUMBER() OVER (PARTITION BY team_name, season ORDER BY "date") AS rn
    FROM TeamGames
),
Wins AS (
    SELECT team_name, season, "date", rn,
           rn - ROW_NUMBER() OVER (PARTITION BY team_name, season ORDER BY "date") AS diff
    FROM Ordered
    WHERE win = 1
),
Streaks AS (
    SELECT team_name, season, diff, COUNT(*) AS streak_length
    FROM Wins
    GROUP BY team_name, season, diff
)
SELECT team_name, season, MAX(streak_length) AS longest_win_streak
FROM Streaks
WHERE season = %(season)s
GROUP BY team_name, season
ORDER BY longest_win_streak DESC;
