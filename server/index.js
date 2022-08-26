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

app.post("/api/newuser", async (req, res) => {
    console.log("POST /registration");
    const { userName } = req.body;
    try {
        const { rows } = await db.newUser(userName);
        res.json(rows[0]);
    } catch (err) {
        console.log("err: ", err);
        res.json({ success: false });
    }
});

// ---------------------server----------------//
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
