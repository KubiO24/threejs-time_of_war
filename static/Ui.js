class Ui {
    play = () => {
        console.log('play')
        
        if(this.audio != undefined) {
            this.audio = new Audio('./music/loginTheme.mp3');
            this.audio.loop = true;
            this.audio.play();
        }
    }
}