// script.js - WireBloom Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // 🔥 MOBILE MENU TOGGLE
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // 🔥 NAVBAR SCROLL EFFECTS
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // Navbar background opacity
        if (scrolled > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.backdropFilter = 'blur(30px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.92)';
            navbar.style.backdropFilter = 'blur(25px)';
        }
        
        // Navbar hide/show on scroll
        if (scrolled > lastScrollY && scrolled > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = scrolled;
    });
    
    // 🔥 SCROLL ANIMATIONS (FADE-IN)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .gallery-item, .custom-section').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // 🔥 SMOOTH SCROLL FOR NAV LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 🔥 PRODUCT HOVER EFFECTS
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Staggered animation
            this.style.animationDelay = `${index * 0.1}s`;
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // 🔥 GALLERY INTERACTIVE
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            // Lightbox effect (simple scale + overlay)
            this.style.transform = 'scale(1.1) rotate(2deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
    
    // 🔥 WHATSAPP BUTTON PULSE ANIMATION
    function createPulse(element) {
        element.style.animation = 'pulse-glow 2s infinite';
    }
    
    // Auto-pulse WhatsApp buttons
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createPulse(this);
        });
        
        // Reset on mouseleave
        btn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // 🔥 PROGRESS BAR ON SCROLL (Subtle)
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const progressBar = document.querySelector('#progress-bar');
        if (!progressBar) {
            const bar = document.createElement('div');
            bar.id = 'progress-bar';
            bar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 4px;
                background: linear-gradient(90deg, var(--gold), var(--soft-pink));
                z-index: 10000;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(230,184,0,0.5);
            `;
            document.body.appendChild(bar);
        } else {
            progressBar.style.width = scrolled + '%';
        }
    });
    
    // 🔥 LAZY LOAD IMAGES (Future proof)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 🔥 COUNTER ANIMATION (Testimonials section)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(start);
        }, 16);
    }
    
    // 🔥 PRELOADER (Optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) preloader.remove();
        }, 500);
    });
    
    // 🔥 ACTIVE NAV LINK ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    console.log('🌸 WireBloom Interactive Features Loaded! 🚀');
});
