// ---------------------requirements----------------//
const express = require("express");
const compression = require("compression");
const app = express();
const db = require("./database/db");
const PORT = process.env.PORT || 3001;
// ---------------------middleware----------------//

app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use(express.json());

// ---------------------routing----------------//

app.post("/api/newcomp", async (req, res) => {
    console.log("POST, /createcomp");
    const { compName, boulderAmount, compFormat } = req.body;
    try {
        const { rows } = await db.newComp(compName, boulderAmount, compFormat);
        res.json(rows);
    } catch {
        res.json({ succes: false });
    }
});

app.get("/api/currentcomps", async (req, res) => {
    console.log("GET /currentcomps");
    try {
        const { rows } = await db.currentComps();
        res.json(rows);
    } catch {
        res.json({ succes: false });
    }
});

app.post("/api/newuser", async (req, res) => {
    console.log("POST /registration");
    const { userName, chosenCompetitionId } = req.body;
    try {
        const { rows } = await db
            .boulderAmount(chosenCompetitionId)
            .then(({ rows }) => {
                let boulderArray = [];
                for (let i = 1; i <= rows[0].boulderamount; i++) {
                    boulderArray.push(`0`);
                }
                return boulderArray;
            })
            .then(async (boulderAmount) => {
                const { rows } = await db.newUser(
                    chosenCompetitionId,
                    userName,
                    boulderAmount
                );
                console.log("rows last: ", rows);
                return rows;
            });
        console.log("rows after: ", rows);

        res.json(rows);
    } catch (err) {
        console.log("err: ", err);
        res.json({ success: false });
    }
});

app.get("/api/getallusers", async (req, res) => {
    console.log("GET /userslist: ");
    try {
        const { rows } = await db.returnAllCompetitors();
        res.json(rows);
    } catch {
        res.json({ succes: false });
    }
});

// ---------------------server----------------//
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
