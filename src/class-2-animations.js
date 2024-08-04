import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// postion
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// // mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 1);

// mesh.scale.set(2, 0.5, 0.5);

// mesh.rotation.reorder("YXZ");
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;

// creating a group
// const group = new THREE.Scene();
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );
// group.add(cube1);
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// );
// cube2.position.x = -2;
// group.add(cube2);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// camera will at that object
// camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
// animations:
// let time = Date.now() * 0.001;
gsap.to(mesh.position, {
  x: 2,
  duration: 2,
});
const clock = new THREE.Clock();
// const tick = () => {
//   // // time
//   // const currentTime = Date.now();
//   // const deltaTime = currentTime - time;
//   // time = currentTime;
//   // // update object
//   // mesh.rotation.y += 0.002 * deltaTime;

//   const elapsedTime = clock.getElapsedTime();
//   console.log(Math.PI * 0.5 * elapsedTime);
//   // update objects
//   mesh.rotation.y = Math.PI * 0.5 * elapsedTime;
//   mesh.position.y = Math.sin(elapsedTime);

//   // render
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// tick();
