const express = require("express");
const compression = require("compression");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./database/db");

app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use(express.json());

app.post("/api/newuser", async (req, res) => {
    console.log("POST /registration");
    const { userName } = req.body;
    try {
        const { rows } = await db.newUser(userName);
        res.json(rows[0]); //username
    } catch (err) {
        console.log("err: ", err);

        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//THIS IS DATABASE: psql -d scoringdatabase
