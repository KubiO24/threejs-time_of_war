class Unit extends THREE.Mesh {
    constructor(unitName, towerPos) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.type = 'unit';
        this.collisionDistance = 23;

        this.level = units[unitName].level;
        this.attackPower = units[unitName].attackPower;
        this.attackSpeed = units[unitName].attackSpeed;
        this.defaultHealth = units[unitName].health;
        this.health = this.defaultHealth;
        this.speed = units[unitName].speed;
        this.model = units[unitName].model
        this.animationsFolder = []
        let unitHeight = unitName === "tank" ? 150 : 100
        this.geometry = new THREE.CylinderGeometry(20, 20, unitHeight, 16); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial({ color: '#00ff00', transparent: true, opacity: 0 });

        this.healthBar = document.createElement('div');
        this.healthBar.className = 'unitHealthBar';

        const levelText = document.createElement('p');
        levelText.textContent = "level " + this.level
        levelText.className = "unitLevel"
        this.healthBar.appendChild(levelText)

        this.healthBarText = document.createElement('p');
        this.healthBarText.textContent = Math.round(this.health);
        this.healthBar.appendChild(this.healthBarText)

        const healthBarOutside = document.createElement('div')
        healthBarOutside.className = 'unitHealthBarOutside';

        this.healthBarInside = document.createElement('div')
        this.healthBarInside.className = 'unitHealthBarInside';

        healthBarOutside.appendChild(this.healthBarInside);
        this.healthBar.appendChild(healthBarOutside)

        const healthBarLabel = new THREE.CSS2DObject(this.healthBar);
        healthBarLabel.position.set(0, this.geometry.parameters.height / 2, 0);
        this.add(healthBarLabel)

        this.mixer = new THREE.AnimationMixer(this.model);
        if (unitName === 'gladiator') {
            this.animationsFolder.push(this.mixer.clipAction(this.model.animations[2]))
            this.animationsFolder.push(this.mixer.clipAction(this.model.animations[1]))
            this.animationsFolder.push(this.mixer.clipAction(this.model.animations[0]))
        } else if (unitName === 'tank') {
            this.animationsFolder.push(this.mixer.clipAction(this.model.animations[1]))
            this.animationsFolder.push(this.mixer.clipAction(this.model.animations[0]))
            this.animationsFolder.push(this.mixer.clipAction(this.model.animations[2]))
        }
        if (towerPos < 0) this.rotation.y = Math.PI / 2
        else this.rotation.y = Math.PI / 2 + Math.PI

        this.animationsFolder[1].play()
        this.model.position.y = 2
        this.activeAction = this.animationsFolder[1]
        this.add(this.model)
    }

    tick = () => {
        if (Math.round(this.health) <= 0) {
            this.parent.remove(this)
            this.healthBar.remove();
            return;
        }
        if (this.parent.position.x < 0) this.moveDirection = 1;
        else this.moveDirection = -1

        const worldPosition = new THREE.Vector3();
        this.getWorldPosition(worldPosition)

        const action = this.checkForCollision(worldPosition);
        if (action == "damage") this.dealDamage();
        else if (action == "move") this.move();
    }

    move = () => {
        this.position.x += (this.speed / 100) * this.moveDirection
        if (this.activeAction !== this.animationsFolder[1]) this.playWalk()
    }

    checkForCollision = (position) => {
        let stop = false;
        let blockingUnit = undefined;

        const collisionDistance = this.collisionDistance;
        const moveDirection = this.moveDirection;
        const unitRadius = this.geometry.parameters.radiusBottom * moveDirection;
        const thisUnit = this;

        game.scene.traverse(function (node) {
            if (node.type == 'tower' || node.type == 'unit') {
                const nodePosition = new THREE.Vector3();
                node.getWorldPosition(nodePosition)

                let nodeRadius = node.geometry.parameters.radiusBottom * moveDirection;
                const distance = (position.x + unitRadius) - (nodePosition.x - nodeRadius);

                if (thisUnit != node && thisUnit.parent == node.parent && Math.abs(distance) < thisUnit.geometry.parameters.radiusBottom + node.geometry.parameters.radiusBottom) {
                    blockingUnit = node;
                    stop = true;
                    return;
                }

                if (moveDirection > 0 && distance >= 0 || distance <= -collisionDistance) return;
                if (moveDirection < 0 && Math.abs(distance) <= 0 || distance >= collisionDistance) return;

                blockingUnit = node;
                stop = true;
            }
        });

        if (blockingUnit != undefined) this.blockingUnit = blockingUnit;
        if (stop) {
            return "damage"
        }
        return "move";
    }

    dealDamage = () => {
        if (this.activeAction !== this.animationsFolder[2]) this.playAttack()
        if (this.blockingUnit.parent == this.parent) {
            if (this.activeAction !== this.animationsFolder[0]) this.playStand()
            return;
        }
        this.blockingUnit.takeDamage(this.attackPower / 100)
        // this.health -= damage;
        // this.healthBarText.textContent = this.health;
        // const healthPercent = (this.health / this.defaultHealth) * 100
        // this.healthBarInside.style.height = healthPercent + '%';
    }

    takeDamage = (damage) => {
        // if(this.health <= 0) alert("You won")
        this.health -= damage;
        this.healthBarText.textContent = Math.round(this.health);
        const healthPercent = (this.health / this.defaultHealth) * 100
        this.healthBarInside.style.height = healthPercent + '%';
    }

    playStand() {
        let lastAction = this.activeAction
        this.activeAction = this.animationsFolder[0]
        lastAction.stop()
        this.activeAction.fadeIn(1)
        this.activeAction.play()
    }
    playWalk() {
        let lastAction = this.activeAction
        this.activeAction = this.animationsFolder[1]
        lastAction.stop()
        this.activeAction.fadeIn(1)
        this.activeAction.play()
    }
    playAttack() {
        let lastAction = this.activeAction
        this.activeAction = this.animationsFolder[2]
        lastAction.stop()
        this.activeAction.fadeIn(1)
        this.activeAction.play()
    }

    cloneFBX = (fbx) => {
        const clone = fbx.clone(true)
        clone.animations = fbx.animations
        clone.skeleton = { bones: [] }

        const skinnedMeshes = {}

        fbx.traverse(node => {
            if (node.isSkinnedMesh) {
                skinnedMeshes[node.name] = node
            }
        })

        const cloneBones = {}
        const cloneSkinnedMeshes = {}

        clone.traverse(node => {
            if (node.isBone) {
                cloneBones[node.name] = node
            }

            if (node.isSkinnedMesh) {
                cloneSkinnedMeshes[node.name] = node
            }
        })

        for (let name in skinnedMeshes) {
            const skinnedMesh = skinnedMeshes[name]
            const skeleton = skinnedMesh.skeleton
            const cloneSkinnedMesh = cloneSkinnedMeshes[name]

            const orderedCloneBones = []

            for (let i = 0; i < skeleton.bones.length; i++) {
                const cloneBone = cloneBones[skeleton.bones[i].name]
                orderedCloneBones.push(cloneBone)
            }

            cloneSkinnedMesh.bind(
                new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
                cloneSkinnedMesh.matrixWorld)

            // For animation to work correctly:
            clone.skeleton.bones.push(cloneSkinnedMesh)
            clone.skeleton.bones.push(...orderedCloneBones)
        }

        return clone
    }
}