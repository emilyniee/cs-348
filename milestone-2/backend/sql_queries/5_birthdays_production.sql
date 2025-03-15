SELECT p.player_name, p.birthday
FROM Player p
WHERE EXTRACT(MONTH FROM p.birthday) = ${bday_month} 
AND EXTRACT(DAY FROM p.birthday) = ${bday_day};
