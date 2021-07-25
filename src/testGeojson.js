import * as THREE from "three";
import { geoGraticule10 } from "d3-geo";

fetch("./countries.geojson")
    .then((res) => res.json())
    .then((countries) => {
        const alt = 50;

        const lineObjs = [
            new THREE.LineSegments(
                new THREE.GeoJsonGeometry(geoGraticule10(), alt),
                new THREE.LineBasicMaterial({
                    color: "white",
                    opacity: 0.04,
                    transparent: true,
                })
            ),
        ];

        const materials = [
            new THREE.LineBasicMaterial({ color: "blue" }), // outer ring
            new THREE.LineBasicMaterial({ color: "green" }), // inner holes
        ];

        countries.features.forEach(({ properties, geometry }) => {
            lineObjs.push(
                new THREE.LineSegments(
                    new THREE.GeoJsonGeometry(geometry, alt),
                    materials
                )
            );
        });

        // Setup renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("viz").appendChild(renderer.domElement);

        // Setup scene
        const scene = new THREE.Scene();
        lineObjs.forEach((obj) => scene.add(obj));
        scene.add(new THREE.AmbientLight(0xbbbbbb));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

        // Setup camera
        const camera = new THREE.PerspectiveCamera();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        camera.position.z = 200;

        // Add camera controls
        const tbControls = new TrackballControls(camera, renderer.domElement);
        tbControls.minDistance = 1;
        tbControls.rotateSpeed = 5;
        tbControls.zoomSpeed = 0.8;

        // Kick-off renderer
        (function animate() {
            // IIFE
            // Frame cycle
            tbControls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        })();
    });