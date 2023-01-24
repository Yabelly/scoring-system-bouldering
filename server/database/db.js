const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/scoringdatabase`
);

module.exports.newUser = (
    chosenCompetitionId,
    userName,
    boulderAmount,
    hash_pincode,
    totalPoints
) => {
    return db.query(
        `
    INSERT INTO competitor (competition_id, username, scoring, hash_pincode, total_points)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
        [
            chosenCompetitionId,
            userName,
            boulderAmount,
            hash_pincode,
            totalPoints,
        ]
    );
};

module.exports.returnAllCompetitors = (competition_id) => {
    return db.query(
        `
    SELECT competitor.username, competitor.total_points FROM competitor
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
    SELECT competitions.compformat, competitions.compname, competitor.id, competitor.competition_id, competitor.username FROM competitor
 JOIN competitions
on competitor.competition_id = competitions.id
WHERE competitor.id = $1
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

module.exports.userUpdateScoring = (
    scoring,
    totalAmountOfScoreUser,
    userId
) => {
    return db.query(
        `
        UPDATE competitor
        SET scoring = $1,
            total_points = $2 
        WHERE id = $3
        RETURNING competitor.scoring
        `,
        [scoring, totalAmountOfScoreUser, userId]
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

module.exports.retrieveUserInfo = (userName, chosenCompetitionId) => {
    return db.query(
        `
        SELECT competitor.hash_pincode, competitor.id FROM competitor
        WHERE (username = $1) AND (competition_id = $2)
    `,
        [userName, chosenCompetitionId]
    );
};

module.exports.compFromId = (userId) => {
    return db.query(
        `
        SELECT competitor.competition_id
        FROM competitor
        WHERE id = $1
        `,
        [userId]
    );
};
// selecting all users where the competition_id equels to the competition_id of the userId that i input

// total_points van userId
// rank van de user
module.exports.pointsUser = (userId) => {
    return db.query(
        `
        SELECT competitor.total_points
        FROM competitor
        WHERE id = $1
        `,
        [userId]
    );
};

module.exports.rankUser = (competition_id) => {
    return db.query(
        `
        SELECT competitor.username, competitor.total_points
        FROM competitor
        WHERE competition_id = $1
        ORDER BY total_points DESC

        `,
        [competition_id]
    );
};
