SELECT p.player_name, p.birthday
FROM Player p
WHERE EXTRACT(MONTH FROM p.birthday) = %(bday_month)s 
AND EXTRACT(DAY FROM p.birthday) = %(bday_day)s;
