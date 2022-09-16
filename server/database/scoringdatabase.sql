DROP TABLE IF EXISTS superuser;
DROP TABLE If EXISTS competitions;

CREATE TABLE superuser (
    id  SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL CHECK (username != ''),
    scoring VARCHAR (1000)
);

CREATE TABLE competitions (
    id SERIAL PRIMARY KEY,
    compname VARCHAR(100) NOT NUll CHECK (compname != ''),
    boulderamount INT,
    compformat VARCHAR(50)
);