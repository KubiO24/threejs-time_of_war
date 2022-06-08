class Game {
    constructor() {
        this.towerPosition = 600;
        this.cameraDistance = 400;
        this.cameraSpeed = 5;
        this.currentCameraSpeed = 0;

        window.addEventListener('resize', this.onWindowResize, false);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#66bfff");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);

        this.labelRenderer = new THREE.CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.getElementById("root").append(this.labelRenderer.domElement);

        this.scene = new THREE.Scene();
        const loader = new THREE.TextureLoader();
        const bgTexture = loader.load('./img/sky.png');
        this.scene.background = bgTexture;

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

        const axesHelper = new THREE.AxesHelper(1000);
        this.scene.add(axesHelper);

        const light = new THREE.HemisphereLight('#ffffff', '#000000', 1); // skyColor, groundColor, intensity
        this.scene.add(light);

        const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
        const groundMaterial = new THREE.MeshBasicMaterial({
            // color: 0xffff00,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./materials/ground.png', function (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.x = 10000 / 30;
                texture.repeat.y = 10000 / 30;
            })
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = Math.PI / 2;
        this.scene.add(this.ground)

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

    startGame = (playerSide) => {
        this.playerSide = playerSide; // 0 - pierwszy | 1 - drugi
        this.generatePlayerTower();
        this.generateOponentTower();
        this.generatePath();
        this.setCamera();
    }

    generatePlayerTower = () => {
        this.playerTower = new Tower();
        this.scene.add(this.playerTower);

        if (this.playerSide) {
            this.playerTower.position.set(this.towerPosition, 0, 0)
        } else {
            this.playerTower.position.set(-this.towerPosition, 0, 0)
        }
    }

    generateOponentTower = () => {
        this.oponentTower = new Tower();
        this.scene.add(this.oponentTower);
        this.oponentTower.position.x = -this.playerTower.position.x
    }

    generatePath = () => {
        const distanceBetweenTowers = Math.abs(this.oponentTower.position.x) + Math.abs(this.playerTower.position.x);
        const pathLength = distanceBetweenTowers - 2 * this.playerTower.geometry.parameters.radiusBottom;
        console.log(pathLength)
        const pathGeometry = new THREE.PlaneGeometry(pathLength, 100);
        const pathMaterial = new THREE.MeshBasicMaterial({
            // color: 0xffff00,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./materials/path.png', function (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.x = pathLength / 40;
                texture.repeat.y = 100 / 40;
            })
        });
        this.path = new THREE.Mesh(pathGeometry, pathMaterial);
        this.path.rotation.x = Math.PI / 2;
        this.path.position.y = 1;
        this.scene.add(this.path)
    }

    setCamera = () => {
        if (this.playerSide) {
            this.camera.position.set(this.playerTower.position.x - 4 * this.playerTower.geometry.parameters.radiusBottom, 100, -this.cameraDistance)
        } else {
            this.camera.position.set(this.playerTower.position.x + 4 * this.playerTower.geometry.parameters.radiusBottom, 100, this.cameraDistance)
        }
        this.camera.lookAt(this.camera.position.x, this.scene.position.y + 70, this.scene.position.z);

        document.addEventListener("keydown", (e) => {
            if (e.code == 'ArrowLeft') {
                if(this.playerSide) this.currentCameraSpeed = this.cameraSpeed;
                else this.currentCameraSpeed = -this.cameraSpeed;
            }

            if (e.code == 'ArrowRight') {
                if(this.playerSide) this.currentCameraSpeed = -this.cameraSpeed;
                else this.currentCameraSpeed = this.cameraSpeed;
            }

        }, false);

        document.addEventListener("keyup", (e) => {
            if (e.code == 'ArrowLeft' || e.code == 'ArrowRight') {
                this.currentCameraSpeed = 0;
            }
        }, false);
    }

    // użycie - await this.sleep(100); 100 - liczba ms
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    render = () => {
        TWEEN.update();
        this.camera.updateProjectionMatrix();

        if(Math.abs(this.camera.position.x + this.currentCameraSpeed) < this.towerPosition) this.camera.position.x += this.currentCameraSpeed;

        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
    }
}