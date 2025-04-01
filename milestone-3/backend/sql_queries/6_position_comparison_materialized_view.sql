CREATE MATERIALIZED VIEW player_avg_stats AS
SELECT
   p.player_id,
   p.player_name,
   AVG(ps.points) AS avg_points,
   AVG(ps.assists) AS avg_assists,
   AVG(ps.rebounds) AS avg_rebounds,
   AVG(ps.blocks) AS avg_blocks,
   AVG(ps.steals) AS avg_steals,
   AVG(ps.turnovers) AS avg_turnovers,
   AVG(ps.fg_attempts) AS fg_attempts,
   AVG(ps.three_pt_attempts) AS avg_three_pt_attempts,
   AVG(ps.three_pt_percent) AS avg_three_pt_percent,
   AVG(ps.fg_percent) AS avg_fg_percent,
   AVG(ps.ft_percent) AS avg_ft_percent,
   AVG(ps.minutes_played) AS avg_minutes_played
FROM Player p
JOIN PlayerStats ps ON p.player_id = ps.player_id
GROUP BY p.player_id, p.player_name
