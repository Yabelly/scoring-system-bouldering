DROP TABLE IF EXISTS competitor;
DROP TABLE If EXISTS competitions;


CREATE TABLE competitions (
    id SERIAL PRIMARY KEY,
    compname VARCHAR(100) NOT NUll CHECK (compname != ''),
    boulderamount INT,
    compformat VARCHAR(50),
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competitor (
    id  SERIAL PRIMARY KEY,
    competition_id INTEGER NOT NULL REFERENCES competitions(id),
    username VARCHAR(50) NOT NULL CHECK (username != ''),
    scoring VARCHAR (1000)

);