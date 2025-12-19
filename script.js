// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Three.js 3D Character
const canvas = document.getElementById('gameCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff6b35, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xffaa00, 1, 100);
pointLight2.position.set(-5, 5, -5);
scene.add(pointLight2);

// Create robot character
const robotGroup = new THREE.Group();

// Head
const headGeometry = new THREE.BoxGeometry(1, 1, 1);
const headMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b35, emissive: 0xff6b35, emissiveIntensity: 0.2 });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 1.5;
robotGroup.add(head);

// Eyes
const eyeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xffaa00, emissive: 0xffaa00, emissiveIntensity: 0.5 });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.25, 1.6, 0.5);
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.25, 1.6, 0.5);
robotGroup.add(leftEye, rightEye);

// Body
const bodyGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.8);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2d1208, emissive: 0xff6b35, emissiveIntensity: 0.1 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 0.25;
robotGroup.add(body);

// Arms
const armGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
const armMaterial = new THREE.MeshPhongMaterial({ color: 0xff8844 });
const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.75, 0.25, 0);
const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.position.set(0.75, 0.25, 0);
robotGroup.add(leftArm, rightArm);

// Legs
const legGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);
const legMaterial = new THREE.MeshPhongMaterial({ color: 0xff8844 });
const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.3, -1.1, 0);
const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
rightLeg.position.set(0.3, -1.1, 0);
robotGroup.add(leftLeg, rightLeg);

scene.add(robotGroup);
camera.position.z = 5;

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 200;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xff6b35 });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    robotGroup.rotation.y += 0.005;
    head.rotation.y = Math.sin(time * 2) * 0.3;
    leftArm.rotation.x = Math.sin(time * 3) * 0.5;
    rightArm.rotation.x = Math.sin(time * 3 + Math.PI) * 0.5;
    
    particlesMesh.rotation.y += 0.001;

    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});