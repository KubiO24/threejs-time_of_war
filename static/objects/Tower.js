class Tower extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        
        this.type = 'tower';
        this.defaultHealth = 1000;
        this.health = this.defaultHealth;

        this.geometry = new THREE.CylinderGeometry(50, 50, 200, 16); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial({ color: '#ff0000' });

        const healthBar = document.createElement( 'div' );
        healthBar.className = 'towerHealthBar';

        this.healthBarText = document.createElement( 'p' );
        this.healthBarText.textContent = "1000"
        healthBar.appendChild(this.healthBarText)

        const healthBarOutside = document.createElement( 'div' )
        healthBarOutside.className = 'towerHealthBarOutside';

        this.healthBarInside = document.createElement( 'div' )
        this.healthBarInside.className = 'towerHealthBarInside';

        healthBarOutside.appendChild(this.healthBarInside);
        healthBar.appendChild(healthBarOutside)

        const healthBarLabel = new THREE.CSS2DObject( healthBar );
        healthBarLabel.position.set( 0, this.geometry.parameters.height/2, 0 );
        this.add( healthBarLabel );
    }

    takeDamage = (damage) => {
        this.health -= damage;
        this.healthBarText.textContent = this.health;
        const healthPercent = (this.health / this.defaultHealth) * 100
        this.healthBarInside.style.height = healthPercent + '%';
    }
}