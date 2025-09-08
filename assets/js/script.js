// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Typewriter effect for the hero section
    function typewriterEffect() {
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            const text = typewriterElement.textContent;
            typewriterElement.textContent = '';
            typewriterElement.style.borderRight = '3px solid #06b6d4';
            
            let i = 0;
            const speed = 100; // Typing speed in milliseconds
            
            function type() {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Start blinking cursor after typing is complete
                    typewriterElement.style.borderRight = 'none';
                    setTimeout(() => {
                        typewriterElement.classList.add('cursor-blink');
                    }, 1000);
                }
            }
            
            // Start typing after a delay to let animations settle
            setTimeout(type, 1500);
        }
    }

    // Initialize the typewriter effect
    typewriterEffect();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for the fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighter based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('text-cyan-400');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-cyan-400');
                    }
                });
            }
        });
    }

    // Parallax effect for the hero section
    function parallaxEffect() {
        const scrollPosition = window.scrollY;
        const heroSection = document.getElementById('home');
        
        if (heroSection && scrollPosition < window.innerHeight) {
            const profileImage = document.querySelector('.profile-container');
            const heroText = document.querySelector('#home h1');
            
            if (profileImage) {
                profileImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
            
            if (heroText) {
                heroText.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
        }
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    }
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', toggleBackToTopButton);
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message as alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.bg-cyan-400.h-2\\.5');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                // First reset to 0
                bar.style.width = '0%';
                // Then animate to the intended width
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, 100);
            }
        });
    }

    // Initialize skill bars with their percentages
    document.querySelectorAll('.flex.justify-between.mb-1').forEach(container => {
        const percentText = container.querySelector('span:last-child').textContent;
        const percentValue = percentText.replace('%', '');
        const skillBar = container.nextElementSibling.querySelector('.bg-cyan-400');
        if (skillBar) {
            skillBar.style.width = percentText;
        }
    });

    // Add event listeners for scroll effects
    window.addEventListener('scroll', function() {
        highlightActiveLink();
        parallaxEffect();
        animateSkillBars();
    });

    // Trigger initial checks
    highlightActiveLink();
    toggleBackToTopButton();
    parallaxEffect();
    
    // Profile image animation effect
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.classList.add('animate-spin-slow');
            setTimeout(() => {
                this.classList.remove('animate-spin-slow');
            }, 1000);
        });
    }
});

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message as alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.bg-cyan-400.h-2\\.5');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                // First reset to 0
                bar.style.width = '0%';
                // Then animate to the intended width
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, 100);
            }
        });
    }

    // Add event listeners for scroll effects
    window.addEventListener('scroll', function() {
        highlightActiveLink();
        parallaxEffect();
        animateSkillBars();
    });

    // Trigger initial checks
    highlightActiveLink();
    toggleBackToTopButton();
    animateSkillBars();
    parallaxEffect();
});

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message as alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }

    // Initialize skill bars with their data-width attribute
    skillBars.forEach(bar => {
        const percentText = bar.parentElement.querySelector('span:last-child').textContent;
        const percent = percentText.replace('%', '');
        bar.setAttribute('data-width', `${percent}%`);
    });

    // Add event listeners for scroll effects
    window.addEventListener('scroll', function() {
        highlightActiveLink();
        animateSkillBars();
    });

    // Trigger initial checks
    highlightActiveLink();
    toggleBackToTopButton();
    animateSkillBars();

    // Add a simple typewriter effect to the profile image (placeholder for personalization)
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            alert("Don't forget to replace this placeholder image with your own professional photo!");
        });
    }
});
