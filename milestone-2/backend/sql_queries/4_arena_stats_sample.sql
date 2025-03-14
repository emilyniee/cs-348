WITH
    HomeStats AS (
        SELECT
            g.home_team_name,
            COUNT(*) AS total_games,
            SUM(
                CASE
                    WHEN g.home_score > g.away_score THEN 1
                    ELSE 0
                END
            ) AS wins
        FROM
            Game g
            JOIN Arenas a ON g.arena_id = a.arena_id
        WHERE
            a.arena_name = 'Michigan Arena'
        GROUP BY
            g.home_team_name
    ),
    AwayStats AS (
        SELECT
            g.away_team_name,
            COUNT(*) AS total_games,
            SUM(
                CASE
                    WHEN g.away_score > g.home_score THEN 1
                    ELSE 0
                END
            ) AS wins
        FROM
            Game g
            JOIN Arenas a ON g.arena_id = a.arena_id
        WHERE
            a.arena_name = 'Michigan Arena'
        GROUP BY
            g.away_team_name
    ),
    TopAwayTeams AS (
        SELECT
            a.away_team_name,
            t.name AS team_name,
            (a.wins * 100.0 / a.total_games) AS win_percentage,
            RANK() OVER (
                ORDER BY
                    (a.wins * 100.0 / a.total_games) DESC
            ) AS rank
        FROM
            AwayStats a
            JOIN Teams t ON a.away_team_name = t.team_name
    )
SELECT
    'Home Team' AS category,
    t.name AS team_name,
    (h.wins * 100.0 / h.total_games) AS win_percentage
FROM
    HomeStats h
    JOIN Teams t ON h.home_team_name = t.team_name
UNION ALL
SELECT
    'Top Away Team' AS category,
    ta.team_name,
    ta.win_percentage
FROM
    TopAwayTeams ta
WHERE
    ta.rank <= 3
ORDER BY
    category,
    win_percentage DESC;