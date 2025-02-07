DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS rosters;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS teams;

CREATE TABLE positions (
    position_id TEXT PRIMARY KEY,
    position_name TEXT NOT NULL
);

CREATE TABLE teams (
    team_id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    conference TEXT
);

CREATE TABLE  players (
    player_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    position_id TEXT,
    avg_points FLOAT,
    avg_assists FLOAT,
    avg_rebounds FLOAT,
    team_id TEXT,
    FOREIGN KEY (position_id) REFERENCES positions(position_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);


CREATE TABLE rosters (
    roster_id SERIAL PRIMARY KEY,
    team_id TEXT NOT NULL,
    season INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    date TEXT NOT NULL,
    season TEXT,
    is_playoff INT,  -- 0 for regular season, 1 for playoff game
    home_score INT,
    away_score INT,
    FOREIGN KEY (home_team) REFERENCES teams(team_id),
    FOREIGN KEY (away_team) REFERENCES teams(team_id)
);


