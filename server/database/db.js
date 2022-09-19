const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/scoringdatabase`
);

module.exports.newUser = (username, emtyScoreCard) => {
    return db.query(
        `
    INSERT INTO competitor (username, scoring)
    VALUES ($1, $2)
    RETURNING competitor.id, competitor.username, competitor.scoring
    `,
        [username, emtyScoreCard]
    );
};

module.exports.returnAllCompetitors = () => {
    return db.query(
        `
    SELECT * FROM competitor
    `
    );
};

module.exports.newComp = (compName, boulderAmount, compFormat) => {
    return db.query(
        `
    INSERT INTO competition(compname, boulderamount, compformat)
    VALUES($1, $2, $3)
    RETURNING *
        `,
        [compName, boulderAmount, compFormat]
    );
};

module.exports.currentComps = () => {
    return db.query(
        `
    SELECT * FROM competitions
    `
    );
};
