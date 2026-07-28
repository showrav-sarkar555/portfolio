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

    // Toast Modal Notification Helpers
    const toastModal = document.getElementById('toast-modal');
    const closeToastBtn = document.getElementById('close-toast');

    function showToastModal(title, message) {
        if (!toastModal) return;
        const titleEl = document.getElementById('toast-title');
        const msgEl = document.getElementById('toast-message');
        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = message;

        toastModal.classList.remove('hidden');
        // Force reflow
        void toastModal.offsetWidth;
        toastModal.classList.remove('opacity-0');
        toastModal.classList.add('opacity-100');
        const toastContent = document.getElementById('toast-content');
        if (toastContent) {
            toastContent.classList.add('animate-toast-pop');
        }
    }

    function hideToastModal() {
        if (!toastModal) return;
        toastModal.classList.remove('opacity-100');
        toastModal.classList.add('opacity-0');
        setTimeout(() => {
            toastModal.classList.add('hidden');
        }, 300);
    }

    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', hideToastModal);
    }

    if (toastModal) {
        toastModal.addEventListener('click', function(e) {
            if (e.target === toastModal) {
                hideToastModal();
            }
        });
    }

    // Contact form submission with mailto integration & Toast Modal
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Build mailto URI
            const mailtoUrl = "mailto:sarkar.showrav19@gmail.com?subject=" + 
                encodeURIComponent(`${subject} (from ${name})`) + 
                "&body=" + 
                encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            // Trigger mail client
            window.location.href = mailtoUrl;

            // Show Toast feedback modal
            showToastModal(
                "Opening Email Client...",
                `Thank you, ${name}! Your default email app is opening with your message ready to send to Showrav Sarkar. You can also copy his email address below.`
            );
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Copy to Clipboard buttons logic
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const copyText = this.getAttribute('data-copy');
            if (!copyText) return;

            const updateButtonFeedback = (button) => {
                const originalHtml = button.innerHTML;
                button.innerHTML = `<i class="fas fa-check mr-1"></i> Copied!`;
                button.classList.add('copied');
                setTimeout(() => {
                    button.innerHTML = originalHtml;
                    button.classList.remove('copied');
                }, 2000);
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(copyText).then(() => {
                    updateButtonFeedback(this);
                }).catch(() => {
                    fallbackCopyText(copyText, this);
                });
            } else {
                fallbackCopyText(copyText, this);
            }

            function fallbackCopyText(text, button) {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    updateButtonFeedback(button);
                } catch (err) {
                    console.error('Failed to copy text', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });

    // Project Category Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Set active class
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize skill bars with their percentages
    document.querySelectorAll('.flex.justify-between.mb-1').forEach(container => {
        const percentText = container.querySelector('span:last-child').textContent;
        const skillBar = container.nextElementSibling.querySelector('.bg-cyan-400');
        if (skillBar) {
            skillBar.style.width = percentText;
        }
    });

    // Animate skill bars when they come into view
    function animateSkillBars() {
        document.querySelectorAll('.bg-cyan-400.h-2\\.5').forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                // Animate
                bar.style.transition = 'width 1.5s ease-in-out';
                bar.style.width = width;
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
    parallaxEffect();
    
    // Profile image animation effect
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 1000);
        });
    }
});
