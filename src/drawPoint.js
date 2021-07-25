import * as THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xb0b0b0);

// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
camera.position.set(0, 0, 200);

const group = new THREE.Group();
scene.add(group);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.position.set(0.75, 0.75, 1.0).normalize();
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
// scene.add(ambientLight);

// scene.add(new THREE.AmbientLight(0xf0f0f0));
// const light = new THREE.SpotLight(0xffffff, 1.5);
// light.position.set(0, 1500, 200);
// light.angle = Math.PI * 0.2;
// light.castShadow = true;
// light.shadow.camera.near = 200;
// light.shadow.camera.far = 2000;
// light.shadow.bias = -0.000222;
// light.shadow.mapSize.width = 1024;
// light.shadow.mapSize.height = 1024;
// scene.add(light);

// const helper = new THREE.GridHelper(160, 10);
// helper.rotation.x = Math.PI / 2;
// group.add(helper);

const helper = new THREE.GridHelper(2000, 100);
// helper.position.y = -1;
helper.rotation.x = Math.PI / 2;
helper.material.opacity = 0.25;
helper.material.transparent = true;
scene.add(helper);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 1000;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var geo = new THREE.BoxGeometry(10, 10, 10, 6);
var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff });
var box = new THREE.Mesh(geo, mat);
box.position.x = 10;
box.position.y = 10;
box.position.z = 10;
scene.add(box);

// camera.position.z = 5;
// camera.position.set(0, 0, 5);

// var dotGeometry = new THREE.Geometry();
// dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
// var dotMaterial = new THREE.PointsMaterial({ size: 1, sizeAttenuation: false });
// var dot = new THREE.Points(dotGeometry, dotMaterial);
// scene.add(dot);

export const animate = function() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};