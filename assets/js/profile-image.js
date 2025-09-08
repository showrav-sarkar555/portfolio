// This script ensures the profile image is displayed properly
document.addEventListener('DOMContentLoaded', function() {
    // Add a fallback for the profile image in case the local file path doesn't work
    const profileImage = document.getElementById('profile-image');
    
    profileImage.onerror = function() {
        // If the image fails to load, try an alternative approach
        const container = profileImage.parentElement;
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        
        // Apply additional centering styling
        profileImage.style.objectFit = 'contain';
        profileImage.style.maxWidth = '100%';
        profileImage.style.maxHeight = '100%';
        profileImage.style.margin = '0 auto';
    };
    
    // Additional centering adjustments
    const container = profileImage.closest('.profile-container');
    if (container) {
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
    }
});
