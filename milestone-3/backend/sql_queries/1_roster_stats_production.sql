WITH P AS (
    SELECT
        RosterMembers.player_id
    FROM
        Teams JOIN Rosters 
            ON Teams.team_name = Rosters.team_name
        JOIN RosterMembers 
            ON Rosters.roster_id = RosterMembers.roster_id
    WHERE Rosters.season = %(season)s
        AND Teams.team_name = %(team_name)s
),
StatsPerGames AS (
    SELECT
        PlayerStats.player_id, PlayerStats.points
    FROM
        Game JOIN PlayerStats 
            ON Game.game_id = PlayerStats.game_id
        WHERE Game.season = %(season)s
        AND (Game.home_team_name = %(team_name)s OR Game.away_team_name = %(team_name)s)
)

SELECT
    player_id,
    player_name,
    avg_points
FROM
    (
        SELECT
            P.player_id,
            avg(points) as avg_points
        FROM
            P JOIN StatsPerGames ON P.player_id = StatsPerGames.player_id
        GROUP BY
            P.player_id
    )
NATURAL JOIN Player;
