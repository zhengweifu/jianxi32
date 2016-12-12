import THREE from 'three';

class Viewport3D {

	constructor(canvas, object) {
		this.canvas = canvas;
		this.width = canvas.clientWidth;
		this.height = canvas.clientHeight;
		this.scene = new THREE.Scene();
		this.center = new THREE.Group();
		this.center.add(object);
		this.scene.add(this.center);
		this.camera = new THREE.PerspectiveCamera(53, this.width / this.height, 1, 10000);
		this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: false});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		this.renderLoop();

		// resize
		canvas.addEventListener('resize', this.onResize.bind(this), false);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	renderLoop() {
		requestAnimationFrame(this.renderLoop.bind(this));
		this.render();
	}

	onResize() {
		this.width = this.canvas.clientWidth;
		this.height = this.canvas.clientHeight;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.width, this.height);
	}

}

export default Viewport3D;