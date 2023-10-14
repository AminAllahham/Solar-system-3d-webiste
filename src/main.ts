import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import earthTexture from "./2k_earth_daymap.jpg";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById("canvasViewer")!;
const scene = new THREE.Scene();

for (let i = 0; i < 10000; i++) {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const starMesh = new THREE.Mesh(starGeometry, starMaterial);
  starMesh.position.set(
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000
  );
  scene.add(starMesh);
}

const earthGeometry = new THREE.SphereGeometry(3, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load(earthTexture),
});

const mesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(mesh);

const aLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(aLight);
const light = new THREE.PointLight(0xffffff, 100);
light.position.set(0, 7, 7);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);

camera.position.set(0, 0, 12);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
