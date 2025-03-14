SELECT
   p.player_id,
   p.player_name,
   AVG(ps.points) AS avg_points
FROM Player p
JOIN PlayerStats ps ON p.player_id = ps.player_id
GROUP BY p.player_id, p.player_name
ORDER BY avg_points DESC;