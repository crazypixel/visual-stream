import 'orbit';


class Scene {

    constructor() {}

    // BASIC SCENE INIT
    init(el) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0x333333);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.soft = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.scene.fog = new THREE.Fog(0x333333, 2000, 4000);

        // lights
        var ambientLight = new THREE.AmbientLight(0x663344);
        this.scene.add(ambientLight);

        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(0, 300, 200);
        light.castShadow = true;
        light.shadowDarkness = 0.8;
        this.scene.add(light);

        // fog
        this.scene.fog = new THREE.FogExp2(0x444444, 0.0065);

        el.appendChild( this.renderer.domElement );

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10000;

        this.camera.position.z = 200;
        this.camera.position.y = 50;
    }

    clear() {
        this.scene.children = [];
    }
}

const scene = new Scene();
export default scene;

