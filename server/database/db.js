const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/scoringdatabase`
);

module.exports.newUser = (
    chosenCompetitionId,
    userName,
    boulderAmount,
    hash_pincode
) => {
    return db.query(
        `
    INSERT INTO competitor (competition_id, username, scoring, hash_pincode)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
        [chosenCompetitionId, userName, boulderAmount, hash_pincode]
    );
};

module.exports.returnAllCompetitors = (competition_id) => {
    return db.query(
        `
    SELECT competitor.id, competitor.competition_id, competitor.username, competitor.scoring FROM competitor
    WHERE competition_id = $1
    `,
        [competition_id]
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
    SELECT competitor.id, competitor.competition_id, competitor.username, competitor.scoring FROM competitor
    WHERE (id = $1 )
    `,
        [userId]
    );
};

module.exports.userScoring = (userId) => {
    return db.query(
        `
    SELECT scoring FROM competitor
    WHERE(id = $1 )
    `,
        [userId]
    );
};

module.exports.userUpdateScoring = (scoring, userId) => {
    console.log("scoring db: ", scoring);
    console.log("userId db: ", userId);

    return db.query(
        `
        UPDATE competitor
        SET scoring = $1 
        WHERE id = $2
        `,
        [scoring, userId]
    );
};

module.exports.userNameCheck = (chosenCompetitionId, userName) => {
    return db.query(
        `
        SELECT * FROM competitor
        WHERE (username = $2) AND (competition_id = $1)
        `,
        [chosenCompetitionId, userName]
    );
};
