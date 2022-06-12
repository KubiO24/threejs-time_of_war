class Tower extends THREE.Mesh {
    constructor(side) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.type = 'tower';
        this.side = side;
        this.defaultHealth = 1000;
        this.health = this.defaultHealth;

        this.geometry = new THREE.CylinderGeometry(50, 50, 200, 16); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial({ color: '#ff0000', opacity: 0, transparent: true, });
        this.loader = new THREE.FBXLoader()
        this.loader.load('../../models/tower.fbx', (object) => {
            this.model = object;

            this.model.scale.set(0.2, 0.2, 0.2);

            this.model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.needsUpdate = false;
                    child.receiveShadow = false;
                    child.castShadow = true;
                    child.wireframe = false;
                }
            });
            console.log(this.model)
            this.add(this.model)
        })

        const healthBar = document.createElement('div');
        healthBar.className = 'towerHealthBar';

        this.healthBarText = document.createElement('p');
        this.healthBarText.textContent = this.health
        healthBar.appendChild(this.healthBarText)

        const healthBarOutside = document.createElement('div')
        healthBarOutside.className = 'towerHealthBarOutside';

        this.healthBarInside = document.createElement('div')
        this.healthBarInside.className = 'towerHealthBarInside';

        healthBarOutside.appendChild(this.healthBarInside);
        healthBar.appendChild(healthBarOutside)

        const healthBarLabel = new THREE.CSS2DObject(healthBar);
        healthBarLabel.position.set(0, this.geometry.parameters.height / 2, 0);
        this.rotation.y = Math.PI / 2
        this.add(healthBarLabel);
    }

    takeDamage = (damage) => {
        if (this.health <= 0) {
            this.health = 0;
            if (this.side == 'player') document.getElementById('gameEndedImage').src = './img/defeat.png';
            else document.getElementById('gameEndedImage').src = './img/victory.png';

            game.gameEnded = true;
            document.querySelector("#gameEnded").style.display = 'flex';
            fetch("/resetUsers", { method: "post" })
        }
        this.health -= damage;
        this.healthBarText.textContent = Math.round(this.health);
        const healthPercent = (this.health / this.defaultHealth) * 100
        this.healthBarInside.style.height = healthPercent + '%';
    }
}