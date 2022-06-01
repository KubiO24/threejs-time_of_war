class Tower extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.geometry = new THREE.CylinderGeometry(10, 10, 80, 8); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial( {color: '#ff0000'} );
    }
}