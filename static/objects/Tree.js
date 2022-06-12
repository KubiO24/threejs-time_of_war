class Tree extends THREE.Mesh {
    constructor() {
        super()
        this.loader = new THREE.FBXLoader()
        this.loader.load('models/tree.fbx', (object) => {
            this.add(this.model)
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