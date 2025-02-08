WITH
    team_home AS (
        SELECT
            away_team_id AS opponent_team,
            home_score - away_score AS point_diff
        FROM
            Game
        WHERE
            home_team_id = '1'
    ),
    team_away AS (
        SELECT
            home_team_id AS opponent_team,
            away_score - home_score AS point_diff
        FROM
            Game
        WHERE
            away_team_id = '1'
    ),
    all_games AS (
        SELECT
            opponent_team,
            point_diff
        FROM
            team_home
        UNION ALL
        SELECT
            opponent_team,
            point_diff
        FROM
            team_away
    )
SELECT
    name,
    opponent_team,
    avg_point_diff
FROM
    (
        (
            SELECT
                opponent_team,
                AVG(point_diff) AS avg_point_diff
            FROM
                all_games
            GROUP BY
                opponent_team
            FETCH FIRST
                3 ROWS ONLY
        )
        UNION ALL
        (
            SELECT
                opponent_team,
                AVG(point_diff) AS avg_point_diff
            FROM
                all_games
            GROUP BY
                opponent_team
            ORDER BY
                avg_point_diff ASC
            FETCH FIRST
                3 ROWS ONLY
        )
    );