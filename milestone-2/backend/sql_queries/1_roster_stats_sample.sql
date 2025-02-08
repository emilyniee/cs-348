SELECT
    player_id,
    name,
    avg_points
FROM
    (
        (
            SELECT
                P.player_id,
                avg(points) as avg_points
            FROM
                (
                    SELECT
                        *
                    FROM
                        (
                            Teams
                            JOIN Rosters ON Teams.team_id = Rosters.team_id
                            AND Rosters.season = '2023'
                            AND Teams.team_id = '1'
                        ) as TeamRosters
                        JOIN RosterMembers ON TeamRosters.roster_id = RosterMembers.roster_id
                ) AS P
                JOIN (
                    SELECT
                        *
                    FROM
                        Game
                        JOIN PlayerStats ON (
                            (
                                Game.home_team_id = '1'
                                OR Game.away_team_id = '1'
                            )
                            AND Game.game_id = PlayerStats.game_id
                            AND Game.season = '2023'
                        )
                ) AS StatsPerGames ON P.player_id = StatsPerGames.player_id
            GROUP BY
                P.player_id
        )
    )
    NATURAL JOIN Player;