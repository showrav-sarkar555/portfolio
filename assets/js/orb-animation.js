// Simplified Orbital Animation using Three.js
const createOrb = () => {
  // Check if the orb container exists
  const orbContainer = document.getElementById('orb-container');
  if (!orbContainer) return;

  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
  });
  
  // Configure renderer
  renderer.setSize(orbContainer.clientWidth, orbContainer.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  orbContainer.appendChild(renderer.domElement);

  // Position camera
  camera.position.z = 5;

  // Create orbit paths - simple circles with no additional effects
  const createOrbitPath = (radius, color, opacity) => {
    const segments = 64;
    const circleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(segments * 3);
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = 0;
    }
    
    circleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const circleMaterial = new THREE.LineBasicMaterial({ 
      color: color, 
      transparent: true, 
      opacity: opacity
    });
    
    const circle = new THREE.LineLoop(circleGeometry, circleMaterial);
    scene.add(circle);
    
    return circle;
  };

  // Create orbit paths - with increasing radius from the center
  const orbit1 = createOrbitPath(1.8, 0x06B6D4, 0.4); // Cyan
  const orbit2 = createOrbitPath(2.3, 0xFF0000, 0.3); // Red
  const orbit3 = createOrbitPath(2.8, 0x06B6D4, 0.2); // Cyan

  // Create star shapes that will orbit
  const createStar = (size, color, opacity) => {
    // Create a star shape with 5 points
    const starGeometry = new THREE.BufferGeometry();
    const vertices = [];
    
    // Parameters for the star
    const innerRadius = size * 0.4;
    const outerRadius = size;
    const numPoints = 5;
    
    // Generate the star vertices
    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (numPoints * 2)) * Math.PI * 2;
      vertices.push(
        radius * Math.sin(angle), 
        radius * Math.cos(angle), 
        0
      );
    }
    
    // Create geometry from vertices
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    // Create material
    const starMaterial = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity
    });
    
    // Create the star
    const star = new THREE.LineLoop(starGeometry, starMaterial);
    scene.add(star);
    
    return star;
  };

  // Create orbiting objects - just simple stars on the orbit paths
  const orbitingObjects = [
    // Stars on orbit 1 (innermost)
    { 
      object: createStar(0.15, 0x06B6D4, 0.9),
      orbitRadius: 1.8,
      speed: 0.008,
      angle: 0
    },
    { 
      object: createStar(0.15, 0x06B6D4, 0.9),
      orbitRadius: 1.8,
      speed: 0.008,
      angle: Math.PI
    },
    
    // Stars on orbit 2 (middle)
    { 
      object: createStar(0.18, 0xFF0000, 0.8),
      orbitRadius: 2.3,
      speed: 0.005,
      angle: Math.PI / 2
    },
    { 
      object: createStar(0.18, 0xFF0000, 0.8),
      orbitRadius: 2.3,
      speed: 0.005,
      angle: 3 * Math.PI / 2
    },
    
    // Stars on orbit 3 (outermost)
    { 
      object: createStar(0.2, 0x06B6D4, 0.7),
      orbitRadius: 2.8,
      speed: 0.003,
      angle: Math.PI / 4
    },
    { 
      object: createStar(0.2, 0x06B6D4, 0.7),
      orbitRadius: 2.8,
      speed: 0.003,
      angle: 5 * Math.PI / 4
    }
  ];

  // Handle window resize
  window.addEventListener('resize', () => {
    renderer.setSize(orbContainer.clientWidth, orbContainer.clientHeight);
  });
  
  // Animation variables
  let time = 0;
  
  // Animation function - simplified
  const animate = () => {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Animate orbiting objects - just simple circular movement
    orbitingObjects.forEach(obj => {
      // Update angle
      obj.angle += obj.speed;
      
      // Update position - perfect circular movement
      obj.object.position.x = Math.cos(obj.angle) * obj.orbitRadius;
      obj.object.position.y = Math.sin(obj.angle) * obj.orbitRadius;
    });
    
    // Render the scene
    renderer.render(scene, camera);
  };
  
  // Start animation
  animate();
};

// Initialize the orb when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit to ensure everything else is loaded
  setTimeout(createOrb, 500);
});
