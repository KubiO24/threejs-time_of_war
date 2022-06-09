class Ui {
    constructor() {
        this.refreshUpgrades();
    }
    login = () => {
        let username = document.querySelector('#usernameInput').value;
        if (username == '') {
            document.querySelector('#emptyUsername').style.display = 'block';
            return
        }
        document.querySelector('#emptyUsername').style.display = 'none';

        net.login(username);
    }

    playMusic = () => {
        if (this.audio == undefined) {
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
        this.playMusic();
    }

    updatePoints = (points) => {
        document.getElementById('pointsValue').innerHTML = points;
    }

    updatePointsSpeed = (speed) => {
        document.getElementById('pointsSpeed').innerHTML = speed;
    }

    toggleUpgrades = () => {
        if (document.getElementById('upgradesMenu').style.transform == 'none') {
            document.getElementById('upgradesMenu').style.transform = 'translateY(480px)'
        } else {
            document.getElementById('upgradesMenu').style.transform = 'none';
        }
    }

    refreshUpgrades = () => {
        document.getElementById('currentPointsSpeed').innerHTML = points.speed.toFixed(1);
        document.getElementById('currentPointsSpeed').style.color = 'white';
        document.getElementById('pointsUpgradeCost').innerHTML = Math.round(upgrades.upgrades.points.cost);

        document.getElementById('gladiatorAttackPower').innerHTML = Math.round(units.gladiator.attackPower);
        document.getElementById('gladiatorAttackPower').style.color = 'white';
        document.getElementById('gladiatorAttackSpeed').innerHTML = Math.round(units.gladiator.attackSpeed);
        document.getElementById('gladiatorAttackSpeed').style.color = 'white';
        document.getElementById('gladiatorHealth').innerHTML = Math.round(units.gladiator.health);
        document.getElementById('gladiatorHealth').style.color = 'white';
        document.getElementById('gladiatorSpeed').innerHTML = Math.round(units.gladiator.speed);
        document.getElementById('gladiatorSpeed').style.color = 'white';
        document.getElementById('gladiatorUpgradeCost').innerHTML = Math.round(upgrades.upgrades.gladiator.cost);

        document.getElementById('tankAttackPower').innerHTML = Math.round(units.tank.attackPower);
        document.getElementById('tankAttackPower').style.color = 'white';
        document.getElementById('tankAttackSpeed').innerHTML = Math.round(units.tank.attackSpeed);
        document.getElementById('tankAttackSpeed').style.color = 'white';
        document.getElementById('tankHealth').innerHTML = Math.round(units.tank.health);
        document.getElementById('tankHealth').style.color = 'white';
        document.getElementById('tankSpeed').innerHTML = Math.round(units.tank.speed);
        document.getElementById('tankSpeed').style.color = 'white';
        document.getElementById('tankUpgradeCost').innerHTML = Math.round(upgrades.upgrades.tank.cost);

        document.getElementById('assassinAttackPower').innerHTML = Math.round(units.assassin.attackPower);
        document.getElementById('assassinAttackPower').style.color = 'white';
        document.getElementById('assassinAttackSpeed').innerHTML = Math.round(units.assassin.attackSpeed);
        document.getElementById('assassinAttackSpeed').style.color = 'white';
        document.getElementById('assassinHealth').innerHTML = Math.round(units.assassin.health);
        document.getElementById('assassinHealth').style.color = 'white';
        document.getElementById('assassinSpeed').innerHTML = Math.round(units.assassin.speed);
        document.getElementById('assassinSpeed').style.color = 'white';
        document.getElementById('assassinUpgradeCost').innerHTML = Math.round(upgrades.upgrades.assassin.cost);
    }
}