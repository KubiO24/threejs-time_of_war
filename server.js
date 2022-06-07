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
        if (userList.length >= 2) {
            callback({ error: true, message: '2 players are already playing' });
            return;
        }

        if (userList.includes(username)) {
            callback({ error: true, message: 'Username taken by other player' });
            return;
        }

        userList.push(username)

        if (userList.length == 2) {
            callback({ error: false, message: 'starting', secondUsername: userList[0] });
            io.emit("waitingForSecondPlayer", userList[1]);
        } else {
            callback({ error: false, message: 'waiting' });
        }
        return;
    });
});