SELECT
   player_id,
   player_name,
   avg_three_pt_percent
FROM player_avg_stats
WHERE avg_three_pt_attempts >= 3
ORDER BY avg_three_pt_percent DESC;