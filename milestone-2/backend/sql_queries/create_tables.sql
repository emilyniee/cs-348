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

DROP TYPE IF EXISTS series_enum;
DROP TYPE IF EXISTS position_enum;
DROP TYPE IF EXISTS conference_enum;

CREATE TYPE series_enum AS ENUM ('Quarterfinals', 'Semifinals', 'Finals', 'Championship Finals');
CREATE TYPE position_enum AS ENUM ('POINT GUARD', 'SHOOTING GUARD', 'SMALL FORWARD', 'POWER FORWARD', 'CENTER');
CREATE TYPE conference_enum AS ENUM ('WESTERN', 'EASTERN');


CREATE TABLE Teams
(
    team_name VARCHAR(200) PRIMARY KEY,
    conference conference_enum NOT NULL

);
CREATE TABLE Arenas
(
    arena_name VARCHAR(200) PRIMARY KEY,
    city_name VARCHAR(200)
);
CREATE TABLE Playoffs
(
    playoff_id SERIAL PRIMARY KEY,
    team_name1 VARCHAR(200) NOT NULL,
    team_name2 VARCHAR(200) NOT NULL,
    series series_enum NOT NULL,
    season VARCHAR(10) NOT NULL,
    FOREIGN KEY (team_name1) REFERENCES Teams(team_name),
    FOREIGN KEY (team_name2) REFERENCES Teams(team_name)

);
CREATE TABLE Player 
( 
    player_id SERIAL PRIMARY KEY, 
    player_name VARCHAR(200) NOT NULL, 
    age INT,
    position position_enum NOT NULL,
    team_name VARCHAR(200) NOT NULL,
    birthday DATE,
    FOREIGN KEY (team_name) REFERENCES Teams(team_name)
); 

CREATE TABLE Game
(
    game_id SERIAL PRIMARY KEY, 
    home_team_name VARCHAR(200) NOT NULL,
    away_team_name VARCHAR(200) NOT NULL,
    season VARCHAR(10) NOT NULL,
    "date" DATE NOT NULL,
    is_playoff BOOLEAN,
    home_score INT NOT NULL,
    away_score INT NOT NULL,
    arena_name VARCHAR(200) NOT NULL,
    FOREIGN KEY (home_team_name) REFERENCES Teams(team_name),
    FOREIGN KEY (away_team_name) REFERENCES Teams(team_name),
    FOREIGN KEY (arena_name) REFERENCES Arenas(arena_name)
);

CREATE TABLE Rosters 
(
    roster_id SERIAL PRIMARY KEY, 
    team_name VARCHAR(200) NOT NULL,
    season VARCHAR(10) NOT NULL,
    FOREIGN KEY (team_name) REFERENCES Teams(team_name)
);

CREATE TABLE RosterMembers
(
    player_id INT NOT NULL, 
    roster_id INT NOT NULL,
    season VARCHAR(10) NOT NULL,
    PRIMARY KEY (player_id, roster_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id),
    FOREIGN KEY (roster_id) REFERENCES Rosters(roster_id)

);
CREATE TABLE GameSeries
(
    playoff_id INT NOT NULL,
    game_id INT NOT NULL,
    PRIMARY KEY (playoff_id, game_id),
    FOREIGN KEY (playoff_id) REFERENCES Playoffs(playoff_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)
);

CREATE TABLE PlayerStats
(
    player_id INT NOT NULL,
    game_id INT NOT NULL,
    points INT,
    assists INT,
    rebounds INT,
    blocks INT,
    steals INT,
    turnovers INT,
    fg_attempts INT,
    three_pt_attempts INT,
    three_pt_percent DECIMAL,
    fg_percent DECIMAL,
    ts_percent DECIMAL,
    ft_percent DECIMAL,
    minutes_played INT,
    PRIMARY KEY (player_id, game_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)

);



CREATE TABLE TeamArenas
(
    arena_name VARCHAR(200) NOT NULL,
    team_name VARCHAR(200) NOT NULL,
    PRIMARY KEY (arena_name, team_name),
    FOREIGN KEY (arena_name) REFERENCES Arenas(arena_name),
    FOREIGN KEY (team_name) REFERENCES Teams(team_name)

);


CREATE INDEX idx_game_arena_name ON Game(arena_name);

CREATE INDEX idx_team_team_name ON Teams(team_name);
CREATE INDEX idx_roster_team_name ON Rosters(team_name);

CREATE INDEX idx_team_roster_members_roster_id ON RosterMembers(roster_id);

CREATE INDEX idx_game_team_name ON Game(home_team_name);
CREATE INDEX idx_game_team_name_away ON Game(away_team_name);

CREATE INDEX idx_game_game_id ON Game(game_id);
CREATE INDEX idx_player_stats_game_id ON PlayerStats(game_id);

CREATE INDEX idx_game_season ON Game(season);
