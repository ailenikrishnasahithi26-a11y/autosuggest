const express = require("express");
const app = express();

const port = process.env.PORT || 4500;

// To tell app where static files (HTML/CSS/JS) are stored
app.use(express.static("frontend"));

app.listen(port, function () {
    console.log("App running on http://localhost:" + port);
});