class ThankYouAnimation {
    constructor() {
        this.initializeParticles();
        this.setupHoverEffects();
        this.setupContactReveal();
    }

    initializeParticles() {
        const particlesConfig = {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                }
            },
            retina_detect: true
        };

        particlesJS('thank-you-particles', particlesConfig);
    }

    setupHoverEffects() {
        const letters = document.querySelectorAll('.thank-you-text span');
        letters.forEach(letter => {
            letter.addEventListener('mouseover', () => {
                letter.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    letter.style.animation = '';
                }, 500);
            });
        });
    }

    setupContactReveal() {
        const contactItems = document.querySelectorAll('.contact-item');
        const revealContact = (item) => {
            item.classList.add('revealed');
        };

        contactItems.forEach((item, index) => {
            setTimeout(() => revealContact(item), 500 + (index * 200));
        });

        // Setup copy to clipboard
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const contactItem = e.target.closest('.contact-item');
                let textToCopy;
                
                // Check if it's a phone number group
                const valueGroup = contactItem.querySelector('.contact-value-group');
                if (valueGroup) {
                    const numbers = Array.from(valueGroup.querySelectorAll('.contact-value'))
                        .map(el => el.textContent.trim());
                    textToCopy = numbers.join('\n');
                } else {
                    textToCopy = contactItem.querySelector('.contact-value').textContent;
                }

                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('copied');
                    }, 2000);
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThankYouAnimation();
});
