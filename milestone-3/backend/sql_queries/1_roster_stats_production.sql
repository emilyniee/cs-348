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
)

SELECT
    player_id,
    player_name,
    birthday, 
    position,
    avg_points,
    avg_assists,
    avg_rebounds,
    avg_blocks,
    avg_steals,
    avg_turnovers,
    fg_attempts,
    avg_three_pt_attempts,
    avg_three_pt_percent,
    avg_fg_percent,
    avg_ft_percent,
    avg_minutes_played
FROM
    (
        SELECT
            P.player_id,
            avg_points,
            avg_assists,
            avg_rebounds,
            avg_blocks,
            avg_steals,
            avg_turnovers,
            fg_attempts,
            avg_three_pt_attempts,
            avg_three_pt_percent,
            avg_fg_percent,
            avg_ft_percent,
            avg_minutes_played
        FROM
            P JOIN player_avg_stats as pas ON P.player_id = pas.player_id
        ORDER BY avg_points
    )
NATURAL JOIN Player;
