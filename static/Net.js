class Net {
    constructor() {
        this.socket = io();
        this.init();
    }

    init = () => {
        window.addEventListener("beforeunload", function (e) {
            const body = JSON.stringify({ username: net.username });
            const headers = { "Content-Type": "application/json" }
            fetch("/resetUser", { method: "post", body, headers })
            e.returnValue = null;
        }, false);

    }

    login = (username) => {
        this.socket.emit("login", username, (response) => {
            if (response.error) {
                document.querySelector('#errorLoginMessage').innerHTML = response.message;
                return;
            }

            this.username = username;

            if (response.message == 'waiting') {
                ui.startWaitingForSecondPlayer();
                this.socket.on("waitingForSecondPlayer", (secondPlayer) => {
                    this.secondUsername = secondPlayer;
                    this.startGame(0);
                    return;
                });
            } else if (response.message == 'starting') {
                this.secondUsername = response.secondUsername;
                this.startGame(1);
            }
            return;
        });
    }

    startGame = (playerSide) => {
        ui.startGame();
        points.startGame();
        game.startGame(playerSide);
    }
}