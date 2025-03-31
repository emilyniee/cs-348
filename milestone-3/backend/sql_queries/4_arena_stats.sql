WITH FilteredGames AS (
    SELECT *
    FROM Game
    WHERE arena_name = %(arena_name)s
)
, HomeStats AS (
    SELECT
        fg.home_team_name,
        COUNT(*) AS total_games,
        SUM(CASE WHEN fg.home_score > fg.away_score THEN 1 ELSE 0 END) AS wins
    FROM FilteredGames fg
    GROUP BY fg.home_team_name
)
, AwayStats AS (
    SELECT
        fg.away_team_name,
        COUNT(*) AS total_games,
        SUM(CASE WHEN fg.away_score > fg.home_score THEN 1 ELSE 0 END) AS wins
    FROM FilteredGames fg
    GROUP BY fg.away_team_name
)
, TopAwayTeams AS (
    SELECT
        a.away_team_name,
        t.team_name,
        (a.wins * 100.0 / a.total_games) AS win_percentage,
        RANK() OVER (
            ORDER BY (a.wins * 100.0 / a.total_games) DESC
        ) AS rank
    FROM AwayStats a
    JOIN Teams t ON a.away_team_name = t.team_name
)
SELECT
    'Home Team' AS category,
    t.team_name,
    (h.wins * 100.0 / h.total_games) AS win_percentage
FROM HomeStats h
JOIN Teams t ON h.home_team_name = t.team_name
UNION ALL
SELECT
    'Top Away Team' AS category,
    ta.team_name,
    ta.win_percentage
FROM TopAwayTeams ta
WHERE ta.rank <= 3
ORDER BY category, win_percentage DESC;
