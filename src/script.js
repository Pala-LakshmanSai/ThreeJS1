import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

const aspectRatio = window.innerWidth / window.innerHeight;
// initialize the camera
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 30 
);
camera.position.set(0, 0, 5);

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
const maxPixelRatio = Math.min(window.devicePixelRatio, 2); 
renderer.setPixelRatio(maxPixelRatio); 

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeigth = window.innerHeight;
  const newAspectRatio = newWidth / newHeigth;
  camera.left = -1 * newAspectRatio;
  camera.right = 1 * newAspectRatio; 
  camera.updateProjectionMatrix();
  } );
const renderloop = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
