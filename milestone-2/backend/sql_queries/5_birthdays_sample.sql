SELECT p.player_name, p.birthday
FROM Player p
WHERE EXTRACT(MONTH FROM p.birthday) = '03'
AND EXTRACT(DAY FROM p.birthday) = '11'
