SELECT 
    p.position,
    AVG(pas.avg_points)          AS position_avg_points,
    AVG(pas.avg_assists)         AS position_avg_assists,
    AVG(pas.avg_rebounds)        AS position_avg_rebounds,
    AVG(pas.avg_blocks)          AS position_avg_blocks,
    AVG(pas.avg_steals)          AS position_avg_steals,
    AVG(pas.avg_turnovers)       AS position_avg_turnovers,
    AVG(pas.avg_three_pt_percent) AS position_avg_three_pt_percent,
    AVG(pas.avg_fg_percent)      AS position_avg_fg_percent,
    AVG(pas.avg_ft_percent)      AS position_avg_ft_percent,
    AVG(pas.avg_minutes_played)  AS position_avg_minutes
FROM Player as p
JOIN player_avg_stats as pas ON p.player_id = pas.player_id
GROUP BY p.position