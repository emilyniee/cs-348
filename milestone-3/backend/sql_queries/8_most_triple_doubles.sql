SELECT P.player_id, P.player_name, P.team_name, COUNT(points) as num_td
FROM playerstats AS PS
JOIN player as P
ON PS.player_id = P.player_id
WHERE 
  (CASE WHEN points >= 10 THEN 1 ELSE 0 END) +
  (CASE WHEN assists >= 10 THEN 1 ELSE 0 END) +
  (CASE WHEN rebounds >= 10 THEN 1 ELSE 0 END) +
  (CASE WHEN blocks >= 10 THEN 1 ELSE 0 END) +
  (CASE WHEN steals >= 10 THEN 1 ELSE 0 END) >= 3
GROUP BY P.player_id, P.player_name, P.team_name
ORDER BY COUNT(points) DESC
