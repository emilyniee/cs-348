SELECT 
    p.player_id,
    p.player_name,
    AVG(ps.minutes_played) AS avg_minutes,
    SUM(ps.points) * 36.0 / SUM(ps.minutes_played) AS points_per36,
    SUM(ps.assists) * 36.0 / SUM(ps.minutes_played) AS assists_per36,
    SUM(ps.rebounds) * 36.0 / SUM(ps.minutes_played) AS rebounds_per36,
    SUM(ps.blocks) * 36.0 / SUM(ps.minutes_played) AS blocks_per36,
    SUM(ps.steals) * 36.0 / SUM(ps.minutes_played) AS steals_per36,
    SUM(ps.turnovers) * 36.0 / SUM(ps.minutes_played) AS turnovers_per36,
    SUM(ps.fg_attempts) * 36.0 / SUM(ps.minutes_played) AS fg_attempts_per36,
    SUM(ps.three_pt_attempts) * 36.0 / SUM(ps.minutes_played) AS three_pt_attempts_per36
FROM Player p
JOIN PlayerStats ps 
  ON p.player_id = ps.player_id
GROUP BY p.player_id, p.player_name
HAVING AVG(ps.minutes_played) < %(threshold_minute)s
ORDER BY points_per36 DESC;
