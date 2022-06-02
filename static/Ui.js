class Ui {
    constructor() {
        this.audioListener = window.addEventListener("mouseover", this.playMusic);
    }

    playMusic = () => {
        if(this.audio != undefined) {
            this.audio = new Audio('./music/loginTheme.mp3');
            this.audio.loop = true;
            this.audio.play();
        };
        window.removeEventListener("mouseover", this.playMusic)
    }

    login = () => {
        let username = document.querySelector('#usernameInput').value;
        if(username == '') {
            document.querySelector('#emptyUsername').style.display = 'block';
            return
        }
        document.querySelector('#emptyUsername').style.display = 'none';

        console.log(username)
    }
}