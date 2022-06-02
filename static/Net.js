class Net {
    constructor() {
        this.socket = io();      
        this.init();
    }

    init() {
        window.addEventListener("beforeunload", function (e) {
            const body = JSON.stringify({username: net.username});
            const headers = { "Content-Type": "application/json" }
            fetch("/resetUser", { method: "post", body, headers })
            e.returnValue = null;
        }, false);
    }

    login = (username) => {
        this.socket.emit("login", username, (response) => {
            console.log(response.error)
            if(!response.error) this.username = username;
            console.log(this.username)
        });   
    }
}