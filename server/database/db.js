const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/scoringdatabase`
);

module.exports.newUser = (username, emtyScoreCard) => {
    return db.query(
        `
    INSERT INTO superuser (username, scoring)
    VALUES ($1, $2)
    RETURNING superuser.id, superuser.username, superuser.scoring
    `,
        [username, emtyScoreCard]
    );
};

module.exports.returnAllSuperUser = () => {
    return db.query(
        `
    SELECT * FROM superuser
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

module.exports.getComp = () => {
    return db.query(
        `
        SELECT * FROM competitions`
    );
};
