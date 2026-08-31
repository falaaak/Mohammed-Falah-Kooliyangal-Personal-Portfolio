document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cursor Reactive Lighting & Magnetic Buttons
    const cursorLight = document.querySelector('.cursor-light');
    const magneticElements = document.querySelectorAll('.magnetic');

    if (window.matchMedia("(hover: hover)").matches) {
        
        // Track mouse for lighting
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            if (cursorLight) {
                cursorLight.style.left = `${x}px`;
                cursorLight.style.top = `${y}px`;
            }
        });

        // Magnetic physics
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const position = el.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // 1.5 Custom Cursor Logic
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor && window.matchMedia("(hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(customCursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });
        });
    }

    // 2. Warhol Split Layout Hero (GSAP)
    const splitHero = document.querySelector('.hero-split-section');
    
    // Check if we have the editorial hero
    const editorialHero = document.querySelector('.editorial-hero');
    
    if (editorialHero) {
        // Animate editorial text in
        gsap.from('.editorial-headline', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });
        
        gsap.from('.editorial-headline .highlight', {
            y: 40,
            opacity: 0,
            rotationX: -20,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.4,
            transformOrigin: "center bottom"
        });
        
        gsap.from('.editorial-photo', {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.5
        });

        gsap.from('.hero-tagline-wrapper', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 1.2
        });
    }

    // 2.5 Lightweight Canvas Particles for Background
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });
            
            requestAnimationFrame(drawParticles);
        }
        
        drawParticles();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // 3. Layered Parallax Scroll (Vanilla JS smooth parallax)
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0.05;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });

        // Liquid Glass Dock Sticky Logic
        const dockNav = document.querySelector('.dock-nav');
        const heroSection = document.querySelector('.editorial-hero') || document.querySelector('#home');
        
        if (dockNav && heroSection) {
            // When user scrolls past the bottom of the hero section, the dock becomes sticky at the top
            const heroBottom = heroSection.offsetHeight;
            if (scrolled > heroBottom - 50) {
                dockNav.classList.add('sticky-dock');
            } else {
                dockNav.classList.remove('sticky-dock');
            }
        }
    });

    // 4. Cinematic Scroll Reveals (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-item, .reveal-scale, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                
                // Trigger counters
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                
                // Keep revealed (no un-observe if we want them to stay visible, which we do)
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Manually trigger initial viewport elements (Hero)
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero-section .reveal-item, .hero-section .reveal-scale');
        heroReveals.forEach(el => el.classList.add('is-revealed'));
        
        const heroCounters = document.querySelectorAll('.hero-section .counter');
        heroCounters.forEach(counter => animateCounter(counter));
    }, 100);

    // 5. Animated Statistics Counter
    function animateCounter(counter) {
        if (counter.classList.contains('is-animated')) return;
        counter.classList.add('is-animated');

        const target = +counter.getAttribute('data-target');
        const duration = 2500; // ms cinematic duration
        const increment = target / (duration / 16); 
        
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    }

    // 6. Liquid Glass Nav Cursor Tracking
    const dockNavMain = document.querySelector('.dock-nav');
    const dockHighlight = document.getElementById('dock-highlight');
    if (dockNavMain && dockHighlight && window.matchMedia("(hover: hover)").matches) {
        dockNavMain.addEventListener('mousemove', (e) => {
            const rect = dockNavMain.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            dockHighlight.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        });
    }

    // 7. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (mobileMenuBtn && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }



    // 9. Contact Form Submission Logic
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (contactForm && successModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default page navigation
            
            const formData = new FormData(contactForm);
            const actionUrl = contactForm.getAttribute('action');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Disable button during submission
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.style.pointerEvents = 'none';

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for Google Forms to bypass CORS
            }).then(() => {
                // Show success modal
                successModal.classList.add('active');
                contactForm.reset();
            }).catch(error => {
                console.error('Error submitting form', error);
                alert('There was an issue sending your message. Please try again.');
            }).finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.pointerEvents = 'all';
            });
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        
        // Close modal on click outside content
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

});

// Global Carousel Functions
window.moveCarousel = function(carouselId, step) {
    const wrapper = document.getElementById(carouselId);
    if (!wrapper) return;
    
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const dots = wrapper.querySelectorAll('.carousel-indicators .dot');
    let current = parseInt(wrapper.getAttribute('data-current')) || 0;
    
    current += step;
    if (current >= slides.length) current = 0;
    if (current < 0) current = slides.length - 1;
    
    wrapper.setAttribute('data-current', current);
    
    slides.forEach((slide, idx) => {
        if (idx === current) {
            slide.classList.add('active');
            if(dots[idx]) dots[idx].classList.add('active');
        } else {
            slide.classList.remove('active');
            if(dots[idx]) dots[idx].classList.remove('active');
        }
    });
};

window.setCarousel = function(carouselId, index) {
    const wrapper = document.getElementById(carouselId);
    if (!wrapper) return;
    
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const dots = wrapper.querySelectorAll('.carousel-indicators .dot');
    
    if (index >= 0 && index < slides.length) {
        wrapper.setAttribute('data-current', index);
        
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add('active');
                if(dots[idx]) dots[idx].classList.add('active');
            } else {
                slide.classList.remove('active');
                if(dots[idx]) dots[idx].classList.remove('active');
            }
        });
    }
};
