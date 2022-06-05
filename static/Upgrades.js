class Upgrades {
    constructor() {
        this.points = {
            multiplayer: 1,
            cost: 100
        }
        
        this.gladiatior = {
            attackPower: 1,
            attackSpeed: 1,
            hp: 1,
            speed: 1
        }

        this.init()
    }

    init = () => {
        document.getElementById('pointsUpgradeCost').innerHTML = this.points.cost;
    }

    upgradePoints = () => {
        if(points.value < this.points.cost) return;

        points.value -= this.points.cost;
        this.points.multiplayer = this.points.multiplayer * 1.1;
        this.points.cost = this.points.cost * 1.05;
        points.speed = this.points.multiplayer;
        document.getElementById('pointsUpgradeCost').innerHTML = Math.round(this.points.cost);
    }
}