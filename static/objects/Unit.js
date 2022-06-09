class Unit extends THREE.Mesh {
    constructor(unitName) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.type = 'unit';
        this.collisionDistance = 10;

        this.attackPower = units[unitName].attackPower;
        this.attackSpeed = units[unitName].attackSpeed;
        this.defaultHealth = units[unitName].health;
        this.health = this.defaultHealth;
        this.speed = units[unitName].speed;      
        
        this.geometry = new THREE.CylinderGeometry(20, 20, 20, 16); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial({ color: '#00ff00' });

    }

    tick = () => {
        if(this.parent.position.x < 0) this.moveDirection = 1;
        else this.moveDirection = -1

        const worldPosition = new THREE.Vector3();
        this.getWorldPosition(worldPosition)
        if(this.checkForCollision(worldPosition)) this.dealDamage();
        else this.move();
    }

    move = () => {  
        this.position.x += (this.speed / 100) * this.moveDirection
    }

    checkForCollision = (position) => {
        let stop = false;
        let blockingUnit = undefined;
        
        const collisionDistance = this.collisionDistance;
        const moveDirection = this.moveDirection;
        const unitRadius = this.geometry.parameters.radiusBottom * moveDirection;

        game.scene.traverse( function( node ) {
            if ( node.type == 'tower' || node.type == 'unit' ) {
                const nodePosition = new THREE.Vector3();
                node.getWorldPosition(nodePosition)
                
                let nodeRadius = node.geometry.parameters.radiusBottom * moveDirection;
                const distance = (position.x + unitRadius) - (nodePosition.x - nodeRadius);

                if(moveDirection > 0 && distance >= 0 || distance <= -collisionDistance) return;
                if(moveDirection < 0 && distance <= 0 || distance >= collisionDistance) return;

                blockingUnit = node;
                stop = true;
            }
        } );

        if(blockingUnit != undefined) this.blockingUnit = blockingUnit;
        if(stop) return true
        return false;
    }

    dealDamage = () => {
        console.log(this.blockingUnit)
        this.blockingUnit.takeDamage(this.attackPower / 100)
        // this.health -= damage;
        // this.healthBarText.textContent = this.health;
        // const healthPercent = (this.health / this.defaultHealth) * 100
        // this.healthBarInside.style.height = healthPercent + '%';
    }
}