import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// cursor

console.log("OrbitControls::", OrbitControls);
const cursor = {
  x: 0,
  y: 0,
};
document.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  // - because y is from top to bottom
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);
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

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
/**
 * Camera
 */
// Camera
// perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// orthographic camera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
// camera.position.z = 2;
camera.position.set(0, 0, 3);

camera.lookAt(mesh.position);
scene.add(camera);

/**
 * Controla
 */
const controls = new OrbitControls(camera, canvas);
// damping make it smoother
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// create fullscreen
camera.aspect = sizes.width / sizes.height;
camera.updateProjectionMatrix();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// animations:
const clock = new THREE.Clock();
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime;

  // update camera based on cursor
  // camera.position.x = cursor.x * 2;
  // camera.position.y = cursor.y * 2;
  // camera.lookAt(mesh.position);

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // update objects
  // mesh.rotation.y = cursor.x * Math.PI * 2;
  // mesh.rotation.x = cursor.y * Math.PI * 2;

  // mesh.position.y = Math.sin(cursor.x * Math.PI * 2) * 3;
  // mesh.position.x = cursor.x * 5;
  // mesh.position.z = cursor.y * 5;

  // orbit control

  camera.lookAt(mesh.position);

  // update controls
  controls.update();
  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
