DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    shot_type VARCHAR(100)
);
INSERT INTO users (name, shot_type) 
    VALUES 
    ('Curry', 'three pointers'), 
    ('Shaq', 'free throws');