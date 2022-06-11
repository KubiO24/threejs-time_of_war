class Points {
    constructor() {
        this.value = 0;
        this.speed = 10;    
    }

    startGame = () => {
        setInterval(this.gain, 10)
    }

    gain = () => {
        if(game.gameEnded) return;
        
        this.value += this.speed / 100;
        this.update();
    }

    add = (value) => {
        this.value += value;
    }

    spend = (value) => {
        this.value -= value;
    }

    update = () => {
        upgrades.checkForUpgrade();
        ui.updatePoints(Math.round(this.value));
        ui.updatePointsSpeed(this.speed.toFixed(1));
    }
}