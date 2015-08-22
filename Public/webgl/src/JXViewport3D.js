/**
 * Created by zwf on 15/8/14.
 */

define(function (require) {
    var THREE = require("./libs/three.js");
    var JXConfigure = require("./JXConfigure");

    var JXViewport3D = function (inCanvas) {

        var _width = inCanvas.width, _height = inCanvas.height;

        this.mainCamera = new THREE.PerspectiveCamera(45, _width / _height, 0.1, 100000);
        this.mainCamera.position.fromArray(JXConfigure.MAIN_CAMERA_POSITION);
        this.mainCamera.lookAt( new THREE.Vector3().fromArray(JXConfigure.MAIN_CAMERA_CENTER));

        this.cameraLight = new THREE.DirectionalLight(0xffffff, 1.0);

        this.controls = new THREE.EditorControls(this.mainCamera, inCanvas);
        //this.controls = new THREE.TrackballControls(this.mainCamera, inCanvas);


        this.renderer = new THREE.WebGLRenderer({canvas : inCanvas, Alpha : true, antialias : true});

        this.renderer.setSize(_width, _height);

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setClearColor(0xcccccc);


        this.scene = new THREE.Scene();

        this.scene.add(this.cameraLight);

        this.helpers = new THREE.Group();

        this.scene.add(this.helpers);

        this.grid = new THREE.GridHelper( 500, 25 );

        this.helpers.add(this.grid);


        var self = this;

        var render = function () {

            self.cameraLight.position.copy(self.mainCamera.position);
            self.cameraLight.target.position.copy(self.controls.center);

            self.scene.updateMatrixWorld();

            self.renderer.clear();

            self.renderer.render( self.scene, self.mainCamera );

        };

        var renderLoop = function () {

            requestAnimationFrame(renderLoop);

            render();
        };


        renderLoop();

    };

    return JXViewport3D;
});
