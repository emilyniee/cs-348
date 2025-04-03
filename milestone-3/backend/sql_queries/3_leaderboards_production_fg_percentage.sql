SELECT
   player_id,
   player_name,
   avg_fg_percent
FROM player_avg_stats
WHERE fg_attempts > 6
ORDER BY avg_fg_percent DESC;