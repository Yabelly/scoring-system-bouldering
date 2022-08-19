const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api/test", (req, res) => {
    res.json({
        message: "If this is visible then connection with server works",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
