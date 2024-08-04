import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 5);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 5);
scene.add(hemisphereLight);

// Point light
const pointLight = new THREE.PointLight(0xff9000, 7, 0, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// React area light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// Spot light
const spotLight = new THREE.SpotLight(
  0x78ff00,
  4.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = -0.75;
scene.add(spotLight);
scene.add(spotLight.target);

/**
 * Objects
 */
const textureLoader = new THREE.TextureLoader();
const customTexture = textureLoader.load("./textures/custom/custom-3.jpg");
customTexture.colorSpace = THREE.SRGBColorSpace;

// MeshBasicMaterial
const material = new THREE.MeshStandardMaterial();
material.map = customTexture;
material.roughness = 0.5698;
material.metalness = 0.6558;

// gui
gui.add(material, "metalness").min(0).max(50).step(0.0001);
gui.add(material, "roughness").min(0).max(50).step(0.0001);
gui.add(pointLight, "intensity").min(0).max(50).step(0.0001);
// gui.add(directionalLight, "intensity").min(0).max(50).step(0.0001);
// gui.add(hemisphereLight, "intensity").min(0).max(50).step(0.0001);
// gui.add(rectAreaLight, "intensity").min(0).max(50).step(0.0001);

// // add color

// Objects
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Load GLTF model
const loader = new GLTFLoader();
loader.load("./animate.glb", function (gltf) {
  const model = gltf.scene;
  scene.add(model);

  const animations = gltf.animations;
  if (animations && animations.length) {
    const mixer = new THREE.AnimationMixer(model);
    animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
      renderer.render(scene, camera);
    }
    animate();
  } else {
    renderer.render(scene, camera);
  }
});
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   plane.rotation.y = 0.1 * elapsedTime;
  //   plane.rotation.z = 0.15 * elapsedTime;

  // Update camera
  //   camera.position.y = 1 + Math.sin(elapsedTime * 2) * 0.5;
  //   camera.position.z = 3 + Math.sin(elapsedTime) * 0.5;
  //   camera.rotation.z = 0.15 * elapsedTime;
  camera.position.z = 3 + Math.sin(elapsedTime * 0.5) * 0.5;

  // Update point light
  //   pointLight.position.y = 4 + Math.sin(elapsedTime * 2) * 1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
