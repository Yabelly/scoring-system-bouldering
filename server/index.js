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
        res.json(rows[0]);
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
    const { userName } = req.body;
    let emtyScoreCard = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    try {
        const { rows } = await db.newUser(userName, emtyScoreCard);
        res.json(rows[0]);
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
