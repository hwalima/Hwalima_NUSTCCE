document.addEventListener('DOMContentLoaded', function() {
    // Create and append modal container
    const modalHTML = `
        <div class="modal-container" id="modalContainer">
            <div class="modal">
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-header">
                        <div class="modal-icon"></div>
                        <h2 class="modal-title"></h2>
                    </div>
                    <div class="modal-body"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Elements
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const themeToggle = document.getElementById('theme-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const floatingSidebarToggle = document.getElementById('floating-sidebar-toggle');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });

    // Sidebar Toggle
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('full-width');
        floatingSidebarToggle.classList.toggle('visible');
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    floatingSidebarToggle.addEventListener('click', toggleSidebar);

    // Navigation
    let currentPageIndex = 0;

    function showPage(index) {
        pages.forEach(page => page.classList.remove('active'));
        pages[index].classList.add('active');
        currentPageIndex = index;
    }

    // Navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentPageIndex < pages.length - 1) {
            showPage(currentPageIndex + 1);
        } else if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
            showPage(currentPageIndex - 1);
        }
    });

    // Navigation with links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(index);
        });
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentPageIndex > 0) {
                // Swipe right - go to previous page
                showPage(currentPageIndex - 1);
            } else if (swipeDistance < 0 && currentPageIndex < pages.length - 1) {
                // Swipe left - go to next page
                showPage(currentPageIndex + 1);
            }
        }
    }

    // Video autoplay on page visibility
    const storyVideo = document.getElementById('story-video');
    const introSection = document.getElementById('introduction');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                storyVideo.play();
                storyVideo.muted = false; // Unmute when visible
            } else {
                storyVideo.pause();
                storyVideo.muted = true; // Mute when not visible
            }
        });
    }, { threshold: 0.5 });

    if (storyVideo && introSection) {
        observer.observe(introSection);
    }

    // Modal functionality
    const modalContainer = document.getElementById('modalContainer');
    const modal = modalContainer.querySelector('.modal');
    const closeModal = modalContainer.querySelector('.close-modal');
    const modalIcon = modalContainer.querySelector('.modal-icon');
    const modalTitle = modalContainer.querySelector('.modal-title');
    const modalBody = modalContainer.querySelector('.modal-body');

    // Function to open modal
    function openModal(card) {
        const iconElement = card.querySelector('i');
        const titleElement = card.querySelector('h3');
        
        // Clone content for modal
        modalIcon.innerHTML = iconElement ? iconElement.outerHTML : '';
        modalTitle.textContent = titleElement ? titleElement.textContent : '';
        
        // Create a clean copy of the content
        const contentCopy = card.cloneNode(true);
        
        // Remove the icon and title from the content if they exist
        const contentIcon = contentCopy.querySelector('i');
        const contentTitle = contentCopy.querySelector('h3');
        if (contentIcon) contentIcon.remove();
        if (contentTitle) contentTitle.remove();
        
        modalBody.innerHTML = contentCopy.innerHTML;
        
        // Show modal with animation
        modalContainer.classList.add('active');
        setTimeout(() => modal.style.transform = 'scale(1)', 10);
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModalHandler() {
        modal.style.transform = 'scale(0.7)';
        modalContainer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click event listeners to all cards
    const cardElements = document.querySelectorAll('.card, .feature-card, .info-card');
    cardElements.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    // Close modal when clicking close button
    closeModal.addEventListener('click', closeModalHandler);

    // Close modal when clicking outside
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModalHandler();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            closeModalHandler();
        }
    });

    // Mouse trail effect
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        particle.className = 'mouse-particle';
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? '#a91d3a' : '#c73659'};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: particle-fade 1s ease-out forwards;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    };

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.5) { // Only create particles 50% of the time for better performance
            createParticle(e.clientX, e.clientY);
        }
    });

    // Add particle fade animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-fade {
            0% {
                transform: scale(1) translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear authentication
        sessionStorage.removeItem('authenticated');
        
        // Redirect to login with fade effect
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.replace('login.html');
        }, 500);
    });

    // Add fade-in effect on page load
    document.body.style.opacity = '1';

    // Initialize first page
    showPage(0);

    // Contact Modal Functionality
    // Select all contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    const contactModals = document.querySelectorAll('.contact-modal');

    // Add click event to each contact card
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the modal ID from the data attribute
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            // Show the modal
            if (modal) {
                modal.classList.add('show');
            }
        });
    });

    // Close modal functionality
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent modal and remove the show class
            const modal = this.closest('.contact-modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Click outside modal to close
    contactModals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            // Close modal if click is on the modal background
            if (event.target === this) {
                this.classList.remove('show');
            }
        });
    });

    // Copy functionality for modal buttons
    const copyButtons = document.querySelectorAll('.modal-contact-group .copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            // Create a temporary textarea to copy text
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            
            // Select and copy the text
            tempTextArea.select();
            document.execCommand('copy');
            
            // Remove the temporary textarea
            document.body.removeChild(tempTextArea);
            
            // Optional: Provide visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            // Revert back after 2 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        });
    });
});
