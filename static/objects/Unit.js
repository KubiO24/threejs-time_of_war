class Unit extends THREE.Mesh {
    constructor(unitName) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.type = 'unit';
        this.collisionDistance = 23;

        this.level = units[unitName].level;
        this.attackPower = units[unitName].attackPower;
        this.attackSpeed = units[unitName].attackSpeed;
        this.defaultHealth = units[unitName].health;
        this.health = this.defaultHealth;
        this.speed = units[unitName].speed;      
        
        this.geometry = new THREE.CylinderGeometry(20, 20, 20, 16); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial({ color: '#00ff00' });

        this.healthBar = document.createElement( 'div' );
        this.healthBar.className = 'unitHealthBar';

        const levelText = document.createElement( 'p' );
        levelText.textContent = "level " + this.level
        levelText.className = "unitLevel"
        this.healthBar.appendChild(levelText)

        this.healthBarText = document.createElement( 'p' );
        this.healthBarText.textContent = Math.round(this.health);
        this.healthBar.appendChild(this.healthBarText)

        const healthBarOutside = document.createElement( 'div' )
        healthBarOutside.className = 'unitHealthBarOutside';

        this.healthBarInside = document.createElement( 'div' )
        this.healthBarInside.className = 'unitHealthBarInside';

        healthBarOutside.appendChild(this.healthBarInside);
        this.healthBar.appendChild(healthBarOutside)

        const healthBarLabel = new THREE.CSS2DObject( this.healthBar );
        healthBarLabel.position.set( 0, this.geometry.parameters.height/2, 0 );
        this.add( healthBarLabel )
    }

    tick = () => {
        if(Math.round(this.health) <= 0) {
            this.parent.remove(this)
            this.healthBar.remove();
            return;
        }
        if(this.parent.position.x < 0) this.moveDirection = 1;
        else this.moveDirection = -1

        const worldPosition = new THREE.Vector3();
        this.getWorldPosition(worldPosition)

        const action = this.checkForCollision(worldPosition);
        if(action == "damage") this.dealDamage();
        else if(action == "move") this.move();
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
        const thisUnit = this;

        game.scene.traverse( function( node ) {
            if ( node.type == 'tower' || node.type == 'unit' ) {
                const nodePosition = new THREE.Vector3();
                node.getWorldPosition(nodePosition)
                
                let nodeRadius = node.geometry.parameters.radiusBottom * moveDirection;
                const distance = (position.x + unitRadius) - (nodePosition.x - nodeRadius);

                if(thisUnit != node && thisUnit.parent == node.parent && Math.abs(distance) < thisUnit.geometry.parameters.radiusBottom + node.geometry.parameters.radiusBottom) {
                    blockingUnit = node;
                    stop = true;
                    return;
                }

                if(moveDirection > 0 && distance >= 0 || distance <= -collisionDistance) return;
                if(moveDirection < 0 && Math.abs(distance) <= 0 || distance >= collisionDistance) return;

                blockingUnit = node;
                stop = true;
            }
        } );

        if(blockingUnit != undefined) this.blockingUnit = blockingUnit;
        if(stop) return "damage"
        return "move";
    }

    dealDamage = () => {
        if(this.blockingUnit.parent == this.parent) return;
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
}