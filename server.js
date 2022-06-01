var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var path = require("path");

app.use(express.json());
app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
});


app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});