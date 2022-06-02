class Ui {
    login = () => {
        let username = document.querySelector('#usernameInput').value;
        if(username == '') {
            document.querySelector('#emptyUsername').style.display = 'block';
            return
        }
        document.querySelector('#emptyUsername').style.display = 'none';

        net.login(username);
    }

    playMusic = () => {
        if(this.audio == undefined) {
            this.audio = new Audio('./music/loginTheme.mp3');
            this.audio.loop = true;
            this.audio.play();
        };
        window.removeEventListener("mouseover", this.playMusic)
    }
}