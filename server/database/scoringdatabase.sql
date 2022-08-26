DROP TABLE IF EXISTS superuser;

CREATE TABLE superuser (
    id  SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL CHECK (username != ''),
    scoring VARCHAR (1000)
);

