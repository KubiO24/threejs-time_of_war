class Game {
    constructor() {
        window.addEventListener('resize', this.onWindowResize, false);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#66bfff");  
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        
        this.scene = new THREE.Scene();
        // const loader = new THREE.TextureLoader();
        // const bgTexture = loader.load('./materials/skybox.jpg');
        // this.scene.background = bgTexture;

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(200, 200, 200)
        this.camera.lookAt(this.scene.position);

        const axesHelper = new THREE.AxesHelper( 1000 );
        this.scene.add( axesHelper );

        const light = new THREE.HemisphereLight( '#ffffff', '#000000', 1 ); // skyColor, groundColor, intensity
        this.scene.add( light );

        const tower = new Tower();
        this.scene.add( tower );

        this.render()

        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();

        window.addEventListener("mousedown", (event) => {
            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouseVector, this.camera);

            let intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                
            }
        });
    }
    
    // użycie - await this.sleep(100); 100 - liczba ms
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render = () => {
        TWEEN.update();
        this.camera.updateProjectionMatrix();

        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}