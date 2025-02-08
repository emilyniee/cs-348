-- Drop existing tables (include all tables that will be re-created)
DROP TABLE IF EXISTS PlayerStats;
DROP TABLE IF EXISTS RosterMembers;
DROP TABLE IF EXISTS GameSeries;
DROP TABLE IF EXISTS TeamArenas;
DROP TABLE IF EXISTS Rosters;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Player;
DROP TABLE IF EXISTS Playoffs;
DROP TABLE IF EXISTS Arenas;
DROP TABLE IF EXISTS Teams;


CREATE TABLE Teams
(
    team_id SERIAL PRIMARY KEY, 
    name VARCHAR(200)
);
CREATE TABLE Arenas
(
    arena_id SERIAL PRIMARY KEY,
    arena_name VARCHAR(200),
    city_name VARCHAR(200)
);
CREATE TABLE Playoffs
(
    playoff_id SERIAL PRIMARY KEY,
    team_id1 INT,
    team_id2 INT,
    series VARCHAR(50),
    season VARCHAR(10),
    FOREIGN KEY (team_id1) REFERENCES Teams(team_id),
    FOREIGN KEY (team_id2) REFERENCES Teams(team_id)

);
CREATE TABLE Player 
( 
    player_id SERIAL PRIMARY KEY, 
    name VARCHAR(200), 
    age DECIMAL,
    position_id VARCHAR(200),
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
); 

CREATE TABLE Game
(
    game_id SERIAL PRIMARY KEY, 
    home_team_id INT,
    away_team_id INT,
    season VARCHAR(10),
    "date" DATE NOT NULL,
    is_playoff BOOLEAN,
    home_score INT,
    away_score INT,
    arena_id INT,
    FOREIGN KEY (home_team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (away_team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (arena_id) REFERENCES Arenas(arena_id)
);

CREATE TABLE Rosters 
(
    roster_id SERIAL PRIMARY KEY, 
    team_id INT,
    season VARCHAR(10),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

CREATE TABLE RosterMembers
(
    player_id INT, 
    roster_id INT,
    season VARCHAR(10),
    PRIMARY KEY (player_id, roster_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id),
    FOREIGN KEY (roster_id) REFERENCES Rosters(roster_id)

);
CREATE TABLE GameSeries
(
    playoff_id INT,
    game_id INT,
    PRIMARY KEY (playoff_id, game_id),
    FOREIGN KEY (playoff_id) REFERENCES Playoffs(playoff_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)
);

CREATE TABLE PlayerStats
(
    player_id INT,
    game_id INT,
    points INT,
    assists INT,
    rebounds INT,
    blocks INT,
    turnovers INT,
    fg_attempts INT,
    three_pt_attempts INT,
    three_pt_percent DECIMAL,
    fg_percent DECIMAL,
    ts_percent DECIMAL,
    ft_percent DECIMAL,
    minutes_played DECIMAL,
    PRIMARY KEY (player_id, game_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)

);



CREATE TABLE TeamArenas
(
    arena_id INT,
    team_id INT,
    PRIMARY KEY (arena_id, team_id),
    FOREIGN KEY (arena_id) REFERENCES Arenas(arena_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)

);


