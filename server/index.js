// ---------------------requirements----------------//
const express = require("express");
const compression = require("compression");
const app = express();
const { hash, compare } = require("./bc");
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
app.get("/api/getallusers/:competition_id", async (req, res) => {
    console.log("GET /getallusers");
    try {
        const { rows } = await db.returnAllCompetitors(
            req.params.competition_id
        );
        res.json(rows);
    } catch {
        res.json({ success: false });
    }
});

app.get("/api/id.json", function (req, res) {
    console.log("GET /id.json");
    res.json({
        userId: req.session.userId,
    });
});

app.post("/api/newcomp", async (req, res) => {
    console.log("POST /createcomp");
    const { compName, boulderAmount, compFormat } = req.body;
    console.log("req.body: ", req.body);
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
    console.log("req.body: ", req.body);
    const { userName, chosenCompetitionId, pinOne } = req.body;

    try {
        const userExists = await db
            .userNameCheck(chosenCompetitionId, userName)
            .then(({ rows }) => (rows[0] ? true : false));

        const boulderArray = await db
            .boulderAmount(chosenCompetitionId)
            .then(({ rows }) => {
                let boulderArray = [];
                for (let i = 1; i <= rows[0].boulderamount; i++) {
                    boulderArray.push(`0`);
                }
                return boulderArray;
            });

        if (!userExists) {
            const hashedPassword = await hash(pinOne);
            await db
                .newUser(
                    chosenCompetitionId,
                    userName,
                    boulderArray,
                    hashedPassword
                )

                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                });
        } else {
            res.json({ success: false, useName: false });
        }
    } catch {
        res.json({ success: false });
    }
});

app.post("/api/userlogin", async (req, res) => {
    console.log("POST /login");
    const { userName, chosenCompetitionId, pinCode } = req.body;
    console.log("req.body: ", req.body);

    try {
        const { rows } = await db.retrieveUserInfo(
            userName,
            chosenCompetitionId
        );

        const isMatch = await compare(pinCode, rows[0].hash_pincode);
        if (isMatch) {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        } else {
            res.json({ success: false, useName: false });
        }
    } catch {
        res.json({ success: false });
    }
});

app.get("/api/userinfo", function (req, res) {
    console.log("GET request /api/user");
    const { userId } = req.session;
    db.getUserInfo(userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.get("/api/alldata", async function (req, res) {
    console.log("GET /api/alldata");
    const { userId } = req.session;

    const userObject = await db.getUserInfo(userId).then(({ rows }) => rows[0]);

    const compDataArray = await db
        .returnAllCompetitors(userObject.competition_id)
        .then(({ rows }) => rows);

    res.json({ userObject, compDataArray });
});

app.get("/api/logout", (req, res) => {
    console.log("GET /logout");
    req.session = null;
    res.json({ success: true });
});

//???how do i make sure that i don't send the data over too much to Scoring-card.js? ????
// ????How do i handle disconnecting of the socket better? when it disconnects it gives me a lot of errors on the the client side????
io.on("connection", async (socket) => {
    if (!socket.request.session.userId) {
        console.log("socket disconnected");
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    console.log("userId: ", userId);

    const scoring = await db
        .userScoring(userId)
        .then(({ rows }) => rows[0].scoring);
    socket.emit(`scorecard`, scoring);

    socket.on("update", (data) => db.userUpdateScoring(data, userId));
});

// ---------------------server----------------//

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
