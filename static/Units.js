class Units {
    constructor() {
        this.unitSpawnCost = 100;

        this.gladiator = {
            attackPower: 10,
            attackSpeed: 10,
            health: 10,
            speed: 200,
            level: 1,
            model: null,
        }

        this.tank = {
            attackPower: 10,
            attackSpeed: 5,
            health: 20,
            speed: 100,
            level: 1,
            model: null
        }

        this.assassin = {
            attackPower: 5,
            attackSpeed: 15,
            health: 5,
            speed: 300,
            level: 1,
            model: null
        }
    }

    loadUnits = async () => {
        this.loader = new THREE.FBXLoader()
        this.loader.load('models/Gladiator.fbx', (object) => {
            this.gladiator.model = object;

            this.gladiator.model.scale.set(0.3, 0.3, 0.3);

            this.gladiator.model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.needsUpdate = false;
                    child.castShadow = false;
                    child.receiveShadow = false;
                    child.castShadow = false;
                    child.wireframe = false;
                }
            });

        },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
        this.loader = new THREE.FBXLoader()
        this.loader.load('models/Tank.fbx', (object) => {
            this.tank.model = object;

            this.tank.model.scale.set(0.5, 0.5, 0.5);

            this.tank.model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.needsUpdate = false;
                    child.castShadow = false;
                    child.receiveShadow = false;
                    child.castShadow = false;
                    child.wireframe = false;
                }
            });

        },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )

        this.loader = new THREE.FBXLoader()
        this.loader.load('models/Assassyn.fbx', (object) => {
            this.assassin.model = object;

            this.assassin.model.scale.set(0.3, 0.3, 0.3);

            this.assassin.model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.needsUpdate = false;
                    child.castShadow = false;
                    child.receiveShadow = false;
                    child.castShadow = false;
                    child.wireframe = false;
                }
            });

            // let testG = new Unit("gladiator")
            // let testT = new Unit("tank")
            // let testA = new Unit('assassin')
            // testG.position.set(10000, -1000, 10000)
            // testT.position.set(10000, -1000, 10000)
            // testA.position.set(10000, -1000, 10000)

            // game.playerUnits.add(testG);
            // game.playerUnits.add(testT);
            // game.playerUnits.add(testA);


            document.getElementById('loadingScreen').style.display = 'none'
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('ui').style.display = 'block';
        },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
}