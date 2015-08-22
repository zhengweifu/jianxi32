/**
 * Created by zwf on 15/8/14.
 */

define(function (require) {
    var THREE = require("./libs/three.js");

    var JXViewport3D = function (inCanvas) {

        var _width = inCanvas.width, _height = inCanvas.height;

        this.mainCamera = new THREE.PerspectiveCamera(45, _width / _height, 0.1, 1000);

        this.controls = new THREE.EditorControls(this.mainCamera, inCanvas);
        //this.controls = new THREE.TrackballControls(this.mainCamera, inCanvas);

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({canvas : inCanvas, Alpha : true, antialias : true});

        var init = function () {
            this.mainCamera.position.set(0, 0, 20);


            this.renderer.setSize(_width, _height);

            this.renderer.setPixelRatio(window.devicePixelRatio);

            this.renderer.setClearColor(0xcccccc);


            this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));

        };

        var render = function () {

            this.scene.updateMatrix();

            this.renderer.render(this.scene, this.mainCamera);

        };

        var renderLoop = function () {

            requestAnimationFrame(renderLoop);

            render();
        };

        init();
        renderLoop();

    };

    return JXViewport3D;
});
