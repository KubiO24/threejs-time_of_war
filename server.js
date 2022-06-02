const express = require("express");
const path = require("path");
const socket = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();

let userList = [];

app.use(express.json());
app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
});

app.post('/resetUser', function (req, res) {
    userList = userList.filter(item => item != req.body.username)
})

const server = app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});

const io = socket(server);

io.on("connection", (socket) => {
    socket.on("login", (username, callback) => {
        if(userList.includes(username)) {
            callback({error: true});
            return;
        }
    
        userList.push(username)
        callback({error: false});
    });
});