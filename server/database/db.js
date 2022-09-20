const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/scoringdatabase`
);

module.exports.newUser = (chosenCompetitionId, userName, boulderAmount) => {
    return db.query(
        `
    INSERT INTO competitor (competition_id, username, scoring)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
        [chosenCompetitionId, userName, boulderAmount]
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
    INSERT INTO competitions(compname, boulderamount, compformat)
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

module.exports.boulderAmount = (chosenCompetitionId) => {
    return db.query(
        `
     SELECT boulderamount FROM competitions
    WHERE (id = $1)
`,
        [chosenCompetitionId]
    );
};

module.exports.getUserInfo = (userId) => {
    return db.query(
        `
    SELECT * FROM competitor
    Where (id = $1 )
    `,
        [userId]
    );
};
