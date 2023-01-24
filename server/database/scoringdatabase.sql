DROP TABLE IF EXISTS competitor;
DROP TABLE If EXISTS competitions;


CREATE TABLE competitions (
    id SERIAL PRIMARY KEY,
    compname VARCHAR(100) NOT NUll CHECK (compname != ''),
    boulderamount INTEGER,
    compformat VARCHAR(50),
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competitor (
    id  SERIAL PRIMARY KEY,
    competition_id INTEGER NOT NULL REFERENCES competitions(id),
    username VARCHAR(50) NOT NULL CHECK (username != ''),
    hash_pincode VARCHAR NOT NULL CHECK (hash_pincode!=''),
    scoring INTEGER[],
    total_points INTEGER
);