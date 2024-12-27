document.addEventListener('DOMContentLoaded', function() {
    console.log('Splash screen script loaded');

    // Initialize floating icons
    const icons = document.querySelectorAll('.splash-icons .icon');
    console.log('Found icons:', icons.length);

    icons.forEach((icon, index) => {
        // Random animation delay
        icon.style.animationDelay = `${index * -1.5}s`;
    });

    // Redirect to main page after delay
    console.log('Starting redirect timeout');
    setTimeout(() => {
        console.log('Fade out animation started');
        const splashContent = document.querySelector('.splash-content');
        
        if (splashContent) {
            splashContent.classList.add('animate__fadeOut');
            console.log('Fade out class added');
        } else {
            console.error('Splash content element not found');
        }

        setTimeout(() => {
            console.log('Preparing to redirect');
            // Store authentication state
            sessionStorage.setItem('authenticated', 'true');
            console.log('Authentication set');
            
            try {
                window.location.replace('index.html');
                console.log('Redirect attempt made');
            } catch (error) {
                console.error('Redirect failed:', error);
            }
        }, 1000);
    }, 3000);
});
