// ---------------------requirements----------------//
const express = require("express");
const compression = require("compression");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const db = require("./database/db");
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

const PORT = process.env.PORT || 3001;

// ---------------------middleware----------------//

// cookie session
// !! for production add secret to secrets.json
app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use(express.json());

// ---------------------routing----------------//

app.get("/api/id.json", function (req, res) {
    console.log("GET /id.json");
    res.json({
        userId: req.session.userId,
    });
});

app.post("/api/newcomp", async (req, res) => {
    console.log("POST, /createcomp");
    const { compName, boulderAmount, compFormat } = req.body;
    try {
        const { rows } = await db.newComp(compName, boulderAmount, compFormat);
        res.json({ succes: true });
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
    console.log("POST /newuser");
    const { userName, chosenCompetitionId } = req.body;
    try {
        db.boulderAmount(chosenCompetitionId)
            .then(({ rows }) => {
                let boulderArray = [];
                for (let i = 1; i <= rows[0].boulderamount; i++) {
                    boulderArray.push(`0`);
                }
                return boulderArray;
            })
            .then((boulderAmount) =>
                db.newUser(chosenCompetitionId, userName, boulderAmount)
            )
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({ success: true });
            });
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

app.get("/api/userinfo", function (req, res) {
    console.log("GET request /api/user");
    const { userId } = req.session;
    db.getUserInfo(userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

io.on("connection", async (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    const { rows } = await db.userScoring(userId);
    socket.emit(`scorecard`, rows[0].scoring);

    await socket.on(`update`, (data) => {
        db.userUpdateScoring(data, userId);
    });
});

// ---------------------server----------------//

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
