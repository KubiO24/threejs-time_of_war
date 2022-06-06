class Upgrades {
    constructor() {
        this.upgrades = {
            points: {
                multiplayer: 1.1,
                cost: 10,
                costMultiplayer: 1.05,
                buttonElement: document.getElementById('pointsUpgradeButton')
            },

            gladiator: {
                attackPower: 1.5,
                attackSpeed: 1.5,
                health: 1.5,
                speed: 1.5,
                cost: 10,
                costMultiplayer: 1.05,
                buttonElement: document.getElementById('gladiatorUpgradeButton')
            },

            tank: {
                attackPower: 1.5,
                attackSpeed: 1.25,
                health: 1.75,
                speed: 1.25,
                cost: 20,
                costMultiplayer: 1.05,
                buttonElement: document.getElementById('tankUpgradeButton')
            },

            assassin: {
                attackPower: 1.25,
                attackSpeed: 1.75,
                health: 1.25,
                speed: 1.75,
                cost: 30,
                costMultiplayer: 1.05,
                buttonElement: document.getElementById('assassinUpgradeButton')
            }
        }
    }


    upgrade = (element) => {
        element = element.id.replace('UpgradeButton', '');

        if(points.value < this.upgrades[element].cost) return;

        points.value -= this.upgrades[element].cost;
        this.upgrades[element].cost = this.upgrades[element].cost * this.upgrades[element].costMultiplayer;

        if(element == 'points') {
            points.speed = points.speed * this.upgrades.points.multiplayer;
            return
        }

        units[element].attackPower = units[element].attackPower * this.upgrades[element].attackPower;
        units[element].attackSpeed = units[element].attackSpeed * this.upgrades[element].attackSpeed;
        units[element].health = units[element].health * this.upgrades[element].health;
        units[element].speed = units[element].speed * this.upgrades[element].speed;
    }


    checkForUpgrade = () => {
        ui.refreshUpgrades();

        for(const [key, upgrade] of Object.entries(this.upgrades)) {
            if(upgrade.cost <= points.value) {
                upgrade.buttonElement.disabled = false;
                if(upgrade.buttonElement.parentElement.querySelector(':hover') == upgrade.buttonElement) this.showNextStats(upgrade.buttonElement)
            }else {
                upgrade.buttonElement.disabled = true;
            }
        }
    }

    showNextStats = (element) => {
        element = element.id.replace('UpgradeButton', '');

        if(element == 'points') {
            document.getElementById('currentPointsSpeed').innerHTML = (points.speed * this.upgrades.points.multiplayer).toFixed(1);
            document.getElementById('currentPointsSpeed').style.color = 'green';
            return;
        }

        document.getElementById(`${element}AttackPower`).innerHTML = Math.round(units[element].attackPower * this.upgrades[element].attackPower);
        document.getElementById(`${element}AttackPower`).style.color = 'green';
        document.getElementById(`${element}AttackSpeed`).innerHTML = Math.round(units[element].attackSpeed * this.upgrades[element].attackSpeed);
        document.getElementById(`${element}AttackSpeed`).style.color = 'green';
        document.getElementById(`${element}Health`).innerHTML = Math.round(units[element].health * this.upgrades[element].health);
        document.getElementById(`${element}Health`).style.color = 'green';
        document.getElementById(`${element}Speed`).innerHTML = Math.round(units[element].speed * this.upgrades[element].speed);
        document.getElementById(`${element}Speed`).style.color = 'green';
    }
}