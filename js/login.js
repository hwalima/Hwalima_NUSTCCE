document.addEventListener('DOMContentLoaded', function() {
    console.log('Login script loaded');
    
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    console.log('Form elements:', {
        loginForm,
        errorMessage,
        togglePassword,
        passwordInput
    });

    // Correct credentials
    const CORRECT_USERNAME = 'hwalima@outlook.com';
    const CORRECT_PASSWORD = '//Mzilikazi123#@!';

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle visibility class
        this.classList.toggle('visible');
    });

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Login attempt:', { username, password });

        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            // Success - redirect to splash screen
            console.log('Login successful');
            sessionStorage.setItem('authenticated', 'true');
            errorMessage.textContent = '';
            loginForm.classList.add('animate__animated', 'animate__fadeOutUp');
            
            setTimeout(() => {
                window.location.href = 'splash.html';
            }, 1000);
        } else {
            // Error - show message and shake form
            console.log('Login failed');
            errorMessage.textContent = 'Invalid email or password';
            loginForm.classList.add('animate__animated', 'animate__shakeX');
            
            // Remove animation class
            setTimeout(() => {
                loginForm.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
        }
    });

    // Initialize floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        // Random starting position
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        shape.style.animationDelay = `${index * -2}s`;
    });
});
