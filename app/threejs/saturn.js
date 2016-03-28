class SaturnExample {
    constructor(instance) {
        this.scene = instance.scene;
        this.camera = instance.camera;
        this.renderer = instance.renderer;

        this.boxes = [];
        this.group = [];
        this.radius = 160;
        this.time = 0;
    }

    // POPULATE SINGLE BOX
    populateBox(e) {

        //e.entities.media[0].media_url
        if (e.place !== null) {

        }

        THREE.ImageUtils.crossOrigin = '';
        if (!e.entities.media) {
            return;
        }

        var texture1 = THREE.ImageUtils.loadTexture(e.entities.media ?
            e.entities.media[0].media_url : null);
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});

        texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
        texture1.repeat.set(1, 1);

        var index = Math.floor(this.group.length * Math.random());
        this.group[index].material = material;
    }

    // PREPARE BOXES
    prepBoxes() {

        for (var i = 0; i < 360; i += 40) {
            var geometry = new THREE.BoxGeometry(40, 40, 2);
            var material = new THREE.MeshPhongMaterial({
                color: 0xe0e0e0,
                emissive: 0xffffff
            });
            var cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
            this.group.push(cube);

            cube.position.x = 60;

            var quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 36 * (i));
            cube.position.applyQuaternion(quaternion);
            cube.rotation.y = Math.PI / 36 * (i) + Math.PI / 2;
        }
    }

    // PREPARE SCENE
    prepScene() {
        // noise
        var noise = function (geom, amount) {
            for (var i = 0; i < geom.vertices.length; i++) {
                var v = geom.vertices[i];
                v.x += -amount / 2 + Math.random() * amount;
                v.y += -amount / 2 + Math.random() * amount;
                v.z += -amount / 2 + Math.random() * amount;
            }
        };

        // saturn
        var geometry = new THREE.TetrahedronGeometry(20, 2);
        noise(geometry, 1.5);

        var material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 10,
            specular: 0xe0e0e0,
            emissive: 0x000000,
            shading: THREE.FlatShading
        });

        // var saturn = new THREE.Mesh(geometry, material);
        // scene.add( saturn );

        // random color
        var getRandomColor = function () {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        // get particle
        var particle = function () {
            var radius = Math.floor(Math.random() * 4) + 1;
            var detail = Math.floor(Math.random() * 2);
            var pGeometry = new THREE.OctahedronGeometry(radius, detail);
            noise(pGeometry, Math.random());

            var pMaterial = new THREE.MeshPhongMaterial({
                color: getRandomColor(),
                shininess: 0,
                specular: 0xffff00,
                emissive: 0x270000,
                shading: THREE.FlatShading
            });

            var pMesh = new THREE.Mesh(pGeometry, pMaterial);

            pMesh.speed = Math.random() * 10 * (1 / radius);
            pMesh.orbit = [
                Math.floor(Math.random() * 4),
                Math.floor(Math.random() * 4),
                Math.floor(Math.random() * 4)
            ];

            return pMesh;
        };

        var particles = [];

        for (var j = 0; j < 6; j++) {
            for (var i = 0; i < 360; i = i + 10) {
                var p = particle();

                this.scene.add(p);
                particles.push(p);

                p.position.x = 100 + 5 * j;
                p.position.y = Math.floor(Math.random() * 10);

                var quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 36 * (i + j));
                p.position.applyQuaternion(quaternion);
            }
        }


        var time = 0;
        var that = this;

        this.render = () => {
            time++;
            requestAnimationFrame( this.render );
            // saturn.rotation.y += 0.005;

            if (particles.length > 0) {
                for (var i = 0; i < particles.length; i++) {

                    particles[i].rotation.x += particles[i].orbit[0] / 100;
                    particles[i].rotation.y += particles[i].orbit[1] / 100;
                    particles[i].rotation.z += particles[i].orbit[2] / 100;

                    var quaternion = new THREE.Quaternion();
                    quaternion.setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        (Math.PI / (360 * 4) * particles[i].speed / 10)
                    );
                    particles[i].position.applyQuaternion(quaternion);
                }
            }

            var quaternion2 = new THREE.Quaternion();
            quaternion2.setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                (1 / 1000)
            );

            for (var j = 0; j < that.group.length; j++) {
                that.group[j].position.applyQuaternion(quaternion2);
                that.group[j].lookAt(new THREE.Vector3(0, 0, 0));
                that.group[j].position.y = Math.sin(Math.PI / 1000 * time * j) * 2;
            }

            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

            this.renderer.render(this.scene, this.camera);
        };

        this.render();
        this.prepBoxes();
    }
}

export default SaturnExample;