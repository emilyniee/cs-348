SELECT p.player_name, p.birthday
FROM Player p
WHERE TO_CHAR(p.birthday, 'MM-DD') = '03-11'
