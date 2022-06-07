class Tower extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.geometry = new THREE.CylinderGeometry(50, 50, 200, 16); // radiusTop, radiusBottom, height, radialSegments
        this.material = new THREE.MeshStandardMaterial({ color: '#ff0000' });
    }


}