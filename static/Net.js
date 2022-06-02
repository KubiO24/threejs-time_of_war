class Net {
    constructor() {
        this.socket = io();

        window.onbeforeunload = this.closePage;
    }

    login = (username) => {
        net.socket.emit("login", username, (response) => {
            console.log(response.error)
            if(!response.error) this.username = username;
        });   
    }

    closePage = () => {
        net.socket.emit("resetUser", this.username);  
    }
}