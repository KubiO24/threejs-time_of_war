class Units {
    constructor() {
        this.gladiator = {
            attackPower: 10,
            attackSpeed: 10,
            health: 10,
            speed: 200,
            level: 1,
            animationsFolder: [],
            model: null
        }

        this.tank = {
            attackPower: 10,
            attackSpeed: 5,
            health: 20,
            speed: 100,
            level: 1,
            animationsFolder: [],
            model: null
        }

        this.assassin = {
            attackPower: 5,
            attackSpeed: 15,
            health: 5,
            speed: 300,
            level: 1,
            animationsFolder: [],
            model: null
        }
        this.loader = new THREE.FBXLoader()
        this.loader.load('models/Gladiator.fbx', (object) => {
            console.log("loaded gladiator")

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
            console.log("loaded tank")

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
    }
}