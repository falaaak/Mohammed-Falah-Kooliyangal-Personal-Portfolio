document.addEventListener('DOMContentLoaded', () => {

    // 0. Cinematic Intro Loader
    const loader = document.getElementById('cinematic-loader');
    
    if (loader) {
        if (true) { // Temporarily forcing intro to play every time for testing
            // Play Intro
            document.body.style.overflow = 'hidden'; // Lock scroll
            
            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem('introPlayed', 'true');
                    loader.style.display = 'none';
                    document.body.style.overflow = ''; // Unlock scroll
                }
            });

            // Skip functionality
            const skipIntro = () => {
                tl.progress(1);
            };
            window.addEventListener('keydown', (e) => { if (e.key === 'Escape') skipIntro(); });
            loader.addEventListener('click', skipIntro);

            // Phase 1: Aggressive Image Flashes with Zooms & Glitches
            const images = document.querySelectorAll('.montage-img');
            
            // Image 1: Raw Black & White Snap
            tl.fromTo('.m-1', 
                { opacity: 0, scale: 1.5 }, 
                { opacity: 1, scale: 1, duration: 0.15, ease: "power4.out" }, 
                0
            );
            tl.to('.m-1', { opacity: 0, duration: 0.05 }, 0.2);

            // Image 2: Red Flash
            tl.fromTo('.m-2', 
                { opacity: 0, scale: 0.8, rotation: -5 }, 
                { opacity: 1, scale: 1.2, duration: 0.2, ease: "power2.in" }, 
                0.25
            );
            tl.to('.m-2', { opacity: 0, duration: 0.05 }, 0.45);

            // Image 3: Blue Distorted Screen Tear
            tl.fromTo('.m-3', 
                { opacity: 0, scale: 1, clipPath: 'inset(40% 0 40% 0)' }, 
                { opacity: 1, scale: 1.1, clipPath: 'inset(0% 0 0% 0)', duration: 0.15, ease: "steps(4)" }, 
                0.5
            );
            tl.to('.m-3', { opacity: 0, duration: 0.05 }, 0.65);

            // Image 4: Inverted High-Contrast
            tl.fromTo('.m-4', 
                { opacity: 0, scale: 2 }, 
                { opacity: 1, scale: 1, duration: 0.2, ease: "expo.out" }, 
                0.7
            );
            tl.to('.m-4', { opacity: 0, duration: 0.05 }, 0.9);

            // Image 5: Red Inverted Nightmare Flash
            tl.fromTo('.m-5', 
                { opacity: 0, scale: 1.05, rotation: 3 }, 
                { opacity: 1, scale: 1, duration: 0.15, ease: "power4.out" }, 
                0.95
            );

            // Phase 2: Kinetic Typography Overlays (Chaotic)
            // Name flashing
            tl.fromTo('.k-1', { opacity: 0, scale: 2, y: -100 }, { opacity: 1, scale: 1, y: 0, duration: 0.1 }, 0.1);
            tl.to('.k-1', { opacity: 0, duration: 0.05 }, 0.2);
            
            tl.fromTo('.k-2', { opacity: 0, scale: 0.5, x: 200 }, { opacity: 1, scale: 1.5, x: 0, duration: 0.1 }, 0.3);
            tl.to('.k-2', { opacity: 0, duration: 0.05 }, 0.4);

            tl.fromTo('.k-3', { opacity: 0, scale: 3, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.15 }, 0.5);
            tl.to('.k-3', { opacity: 0, duration: 0.05 }, 0.7);

            // Outline Role text flashing rapidly over final hold image
            tl.fromTo('.k-4', { opacity: 0, scale: 1 }, { opacity: 1, scale: 2.5, duration: 0.1 }, 0.95);
            tl.to('.k-4', { opacity: 0, duration: 0.05 }, 1.1);
            
            tl.fromTo('.k-5', { opacity: 0, scale: 4 }, { opacity: 1, scale: 1, duration: 0.1 }, 1.15);
            tl.to('.k-5', { opacity: 0, duration: 0.05 }, 1.3);

            // Phase 3: Final Glitch out of the loader
            tl.to('.m-5', { filter: 'hue-rotate(180deg) invert(1) contrast(300%)', x: 20, duration: 0.05 }, 1.4);
            tl.to('.m-5', { x: -20, duration: 0.05 }, 1.45);
            tl.to('.m-5', { opacity: 0, scale: 1.5, duration: 0.1 }, 1.5);
            tl.to('.loader-progress-bar', { opacity: 0, duration: 0.1 }, 1.5);
            
            // Phase 5: Fade Out Loader
            tl.to(loader, { opacity: 0, duration: 1, ease: "power2.inOut" }, 4.0);

        } else {
            // Already played in this session
            loader.style.display = 'none';
        }
    }

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
    if (splitHero && typeof gsap !== 'undefined') {
        const slices = document.querySelectorAll('.mask-slice');
        const giantTexts = document.querySelectorAll('.giant-text');
        
        // Initial reveal animation
        gsap.from(slices, {
            y: "100%",
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.2
        });
        
        gsap.from('.hero-right-content .reveal-word', {
            y: "100%",
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.8
        });

        gsap.from('.hero-label, .hero-paragraph, .hero-actions, .hero-socials-block', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 1.2
        });

        // Mouse Move Parallax for Slices
        splitHero.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            const xPos = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
            const yPos = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

            giantTexts.forEach((text, index) => {
                // Irregular vertical slices effect
                // Slices move slightly differently from each other
                const speedX = (index % 2 === 0 ? 1 : -1) * 10;
                const speedY = ((index % 3) - 1) * 25; // -25, 0, 25...
                
                gsap.to(text, {
                    x: xPos * speedX,
                    marginTop: yPos * speedY,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
        
        // Reset on leave
        splitHero.addEventListener('mouseleave', () => {
            gsap.to(giantTexts, {
                x: 0,
                marginTop: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.4)"
            });
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
        const heroSection = document.querySelector('.hero-split-section');
        
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

    // 8. Pop Art Toggle Logic
    const popArtToggleBtn = document.getElementById('pop-art-toggle');
    const heroLeftMask = document.getElementById('hero-mask-container');
    
    if (popArtToggleBtn && heroLeftMask) {
        popArtToggleBtn.addEventListener('click', () => {
            heroLeftMask.classList.toggle('pop-art-active');
            
            // Optional: Toggle icon state or add a small animation class
            popArtToggleBtn.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                popArtToggleBtn.style.transform = 'translateY(-50%) scale(1)';
            }, 150);
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
