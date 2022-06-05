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

    startWaitingForSecondPlayer = () => {
        document.getElementById('inputs').style.display = 'none'
        document.getElementById('waitingScreen').style.display = 'flex'
        this.playMusic();
    }

    startGame = () => {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('ui').style.display = 'block';
    }

    updatePoints = (points) => {
        document.getElementById('pointsValue').innerHTML = points;
    }

    updatePointsSpeed = (speed) => {
        document.getElementById('pointsSpeed').innerHTML = speed;
    }

    toggleUpgrades = () => {   
        if(document.getElementById('upgradesMenu').style.transform == 'none') {
            document.getElementById('upgradesMenu').style.transform = 'translateY(480px)'
        }else {
            document.getElementById('upgradesMenu').style.transform = 'none';
        }
    }
}