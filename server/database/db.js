const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/scoringdatabase`
);

module.exports.newUser = (username) => {
    return db.query(
        `
    INSERT INTO superuser (username)
    VALUES ($1)
    RETURNING superuser.id, superuser.username
    `,
        [username]
    );
};
