// Simplified Profile Animation - Non-interactive version
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.querySelector('.profile-container .rounded-full');
    const orbContainer = document.getElementById('orb-container');
    
    if (!profileContainer || !orbContainer) return;
    
    // Ensure the profile is properly styled
    profileContainer.style.position = 'relative';
    profileContainer.style.zIndex = '10';
    
    // Add a simple border glow
    profileContainer.style.boxShadow = '0 0 15px 5px rgba(6, 182, 212, 0.2)';
});
