// Simplified Background Stars Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create additional particles dynamically
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    // Add a few background stars (small dots in the background)
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'background-star';
        
        // Random positioning across the entire hero section
        // Avoid placing stars in the center area where the profile is
        let top = Math.random() * 100;
        let left = Math.random() * 100;
        
        // Avoid center area
        while (top > 30 && top < 70 && left > 30 && left < 70) {
            top = Math.random() * 100;
            left = Math.random() * 100;
        }
        
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        
        // Simple white dots
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.borderRadius = '50%';
        star.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        star.style.position = 'absolute';
        star.style.zIndex = '0';
        star.style.pointerEvents = 'none';
        
        homeSection.appendChild(star);
    }
});
