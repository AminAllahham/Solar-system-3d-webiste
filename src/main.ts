import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import sunTexture from "./images/Sun.webp";
import earthTexture from "./images/earth.jpg";
import jupiterTexture from "./images/jupiter.jpeg";
import marsTexture from "./images/mars.jpeg";
import mercuryTexture from "./images/mercury.jpeg";
import neptuneTexture from "./images/neptune.jpeg";
import saturnTexture from "./images/saturn.jpeg";
import uranusTexture from "./images/uranus.jpg";
import venusTexture from "./images/venus.jpeg";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};



const sortedPlanetsWithSun = [
  {
    name: "Sun",
    texture: sunTexture,
    size: 5,
    distance: 0,
    rotationSpeed: 0.01,
  },
  {
    name: "Mercury",
    texture: mercuryTexture,
    size: 0.5,
    distance: 15,
    rotationSpeed: 0.01,
  },
  {
    name: "Venus",
    texture: venusTexture,
    size: 1,
    distance: 10,
    rotationSpeed: 0.01,
  },
  {
    name: "Earth",
    texture: earthTexture,
    size: 1,
    distance: 15,
    rotationSpeed: 0.01,
  },
  {
    name: "Mars",
    texture: marsTexture,
    size: 0.5,
    distance: 20,
    rotationSpeed: 0.01,
  },
  {
    name: "Jupiter",
    texture: jupiterTexture,
    size: 2,
    distance: 25,
    rotationSpeed: 0.01,
  },
  {
    name: "Saturn",
    texture: saturnTexture,
    size: 1.5,
    distance: 30,
    rotationSpeed: 0.01,
  },
  {
    name: "Uranus",
    texture: uranusTexture,
    size: 1,
    distance: 35,
    rotationSpeed: 0.01,
  },
  {
    name: "Neptune",
    texture: neptuneTexture,
    size: 1,
    distance: 40,
    rotationSpeed: 0.01,
  },
];

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

for (const planet of sortedPlanetsWithSun) {
  const planetGeometry = new THREE.SphereGeometry(planet.size, 24, 24);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(planet.texture),
  });
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.position.set(planet.distance, 0, 0);
  scene.add(planetMesh);
}

const aLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(aLight);
const light = new THREE.PointLight(0xffffff, 1000);
light.position.set(0, 0, 0);
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
