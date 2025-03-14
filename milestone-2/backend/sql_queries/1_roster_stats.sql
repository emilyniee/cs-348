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
                            JOIN Rosters ON Teams.team_name = Rosters.team_name
                            AND Rosters.season = ${season}
                            AND Teams.team_name = ${team_name}
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
                                Game.home_team_name = ${team_name}
                                OR Game.away_team_name = ${team_name}
                            )
                            AND Game.game_id = PlayerStats.game_id
                            AND Game.season = ${season}
                        )
                ) AS StatsPerGames ON P.player_id = StatsPerGames.player_id
            GROUP BY
                P.player_id
        )
    )
    NATURAL JOIN Player;