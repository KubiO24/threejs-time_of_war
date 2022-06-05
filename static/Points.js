class Points {
    constructor() {
        this.value = 0;
        this.speed = 10;

        setInterval(this.gain, 10)
    }

    gain = () => {
        this.value = this.value;
        this.value += (this.speed / 100) * upgrades.points.multiplayer;
        this.update();
    }

    add = (value) => {
        this.value += value;
    }

    spend = (value) => {
        this.value -= value;
    }

    update = () => {
        ui.updatePoints(Math.round(this.value));
        ui.updatePointsSpeed(this.speed.toFixed(1));
    }
}