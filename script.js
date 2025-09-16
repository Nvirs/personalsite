
// Loading Screen Handler
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time (you can remove this setTimeout if you want it to load instantly)
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000); // 2 seconds loading time
});

document.addEventListener('DOMContentLoaded', function() {
   
    const spaceObjects = [];
    const STAR_COUNT = 50;  // Reduced for cleaner UI
    const PLANET_COUNT = 0;  // Restored to 5 planets
    
    // Star class
    class Star {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 2 + 1;
            this.blinkSpeed = Math.random() * 3 + 1;
            this.opacity = Math.random();
            this.color = `hsl(${Math.random() * 60 + 200}, 100%, 80%)`;
        }
        
        update() {
            this.opacity = 0.5 + Math.sin(Date.now() / (1000 * this.blinkSpeed)) * 0.5;
        }
        
        draw(ctx) {
            if (!ctx || !this.color) return;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Star glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 4
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Planet class
    class Planet {
        constructor() {
            this.reset();
            this.size = Math.random() * 40 + 20;
            this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
            this.ringColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            this.hasRing = Math.random() > 0.5;
            this.ringSize = this.size * 1.5;
            this.glowColor = this.color;
            this.orbitSpeed = Math.random() * 0.001 + 0.0005;
            this.orbitRadius = Math.random() * 100 + 50;
            this.orbitAngle = Math.random() * Math.PI * 2;
            this.originalX = this.x;
            this.originalY = this.y;
        }
        
        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
        }
        
        update() {
            // Orbit movement
            this.orbitAngle += this.orbitSpeed;
            this.x = this.originalX + Math.cos(this.orbitAngle) * this.orbitRadius;
            this.y = this.originalY + Math.sin(this.orbitAngle) * this.orbitRadius;
        }
        
        draw(ctx) {
            if (!ctx || !this.glowColor) return;
            
            // Planet glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, this.glowColor);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Planet ring if it has one
            if (this.hasRing) {
                ctx.beginPath();
                ctx.ellipse(
                    this.x, this.y,
                    this.ringSize, this.ringSize / 4,
                    Math.PI / 4,
                    0, Math.PI * 2
                );
                ctx.strokeStyle = this.ringColor;
                ctx.globalAlpha = 0.5;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
            // Planet body
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.8;
            ctx.fill();
        }
    }
    
   
    const canvas = document.getElementById('vanta-bg');
    if (!canvas) {
        console.warn('Canvas element not found');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Canvas context not available');
        return;
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create space objects
    for (let i = 0; i < STAR_COUNT; i++) {
        spaceObjects.push(new Star());
    }
    
    for (let i = 0; i < PLANET_COUNT; i++) {
        spaceObjects.push(new Planet());
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(10, 10, 31, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw all space objects
        spaceObjects.forEach(obj => {
            obj.update();
            obj.draw(ctx);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();

    // Section background effects
    function initializeSpaceEffects() {
        const spaceBackgrounds = document.querySelectorAll('.space-background');
        
        spaceBackgrounds.forEach(background => {
            const starsContainer = background.querySelector('.stars');
            // meteorsContainer removed
            // Safety check - only proceed if containers exist
            if (!starsContainer) {
                console.warn('Some space background containers not found');
                return;
            }
            
    // Random stars removed for cleaner UI
            
   
    // All floating shapes removed for cleaner UI
            

    // Meteor shower removed for cleaner UI
        });
    }
    
    
    initializeSpaceEffects();
    
    
    // Background scroll effects removed for consistent appearance

    
    window.addEventListener('resize', function() {
        if (vantaEffect) {
            vantaEffect.resize();
        }
    });

   
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        } else {
            startEffect(currentEffect);
        }
    });
    
    
    let scrollSpeed = 0;
    let lastScrollTop = 0;
    let mouseX = 0;
    let mouseY = 0;
    let vantaEffect = null;
    let currentEffect = null;
    
    // Simple startEffect function to prevent errors
    function startEffect(effect) {
        // Placeholder function - can be expanded later if needed
        console.log('Starting effect:', effect);
    }
    
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset;
        scrollSpeed = (st - lastScrollTop) * 0.1;
        lastScrollTop = st;
        
        
        // Parallax and nebula effects removed for consistent background
    });
    
    
    class Constellation {
        constructor(stars) {
            this.stars = stars;
            this.connections = [];
            this.generateConnections();
        }
        
        generateConnections() {
            for (let i = 0; i < this.stars.length; i++) {
                for (let j = i + 1; j < this.stars.length; j++) {
                    const distance = Math.hypot(
                        this.stars[i].x - this.stars[j].x,
                        this.stars[i].y - this.stars[j].y
                    );
                    if (distance < 150) {
                        this.connections.push([i, j]);
                    }
                }
            }
        }
        
        draw() {
            this.connections.forEach(([i, j]) => {
                const star1 = this.stars[i];
                const star2 = this.stars[j];
                const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
                const opacity = Math.max(0, (150 - distance) / 150) * 0.2;
                
                ctx.beginPath();
                ctx.moveTo(star1.x, star1.y);
                ctx.lineTo(star2.x, star2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });
        }
    }
    
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
   
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .stat-item, .skill-category');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    
    // Shape scroll effects removed for consistent background
    
    
    function createSpaceBackground() {
        createStars();
        createStarbursts();
        // createMeteors() removed
    }
    
   
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const starCount = 30;  // Reduced for cleaner UI
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            starsContainer.appendChild(star);
        }
    }
    
   
    function createStarbursts() {
        const starburstsContainer = document.getElementById('starbursts');
        const starburstCount = 5;  // Reduced for cleaner UI
        
        for (let i = 0; i < starburstCount; i++) {
            const starburst = document.createElement('div');
            starburst.className = 'starburst';
            starburst.style.left = Math.random() * 100 + '%';
            starburst.style.top = Math.random() * 100 + '%';
            starburst.style.animationDelay = Math.random() * 4 + 's';
            starburst.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            starburstsContainer.appendChild(starburst);
        }
    }
    
  
    // createMeteors function completely removed
    
    
    // createFloatingShapes function removed
    
    
    createSpaceBackground();
    
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    
    const nameElement = document.querySelector('.title-name');
    if (nameElement) {
        const originalName = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalName, 150);
        }, 1000);
    }
    
   
    // Custom cursor removed for better UX
    
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
          
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    

    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    
    
    
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
    
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        
        const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
    
    
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
   
    function createCosmicParticles() {
        const hero = document.querySelector('.hero');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'cosmic-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
       
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            
            const particleType = Math.random();
            let particleStyle = '';
            
            if (particleType < 0.3) {
                
                particleStyle = `
                    width: 1px;
                    height: 1px;
                    background: radial-gradient(circle, rgba(138, 43, 226, 0.8), transparent);
                    box-shadow: 0 0 6px rgba(138, 43, 226, 0.6);
                `;
            } else if (particleType < 0.6) {
                
                particleStyle = `
                    width: 2px;
                    height: 2px;
                    background: radial-gradient(circle, rgba(30, 144, 255, 0.8), transparent);
                    box-shadow: 0 0 8px rgba(30, 144, 255, 0.6);
                `;
            } else {
                
                particleStyle = `
                    width: 1px;
                    height: 1px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
                    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
                `;
            }
            
            particle.style.cssText = `
                position: absolute;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: cosmicFloat ${Math.random() * 15 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 10}s;
                ${particleStyle}
            `;
            
            particleContainer.appendChild(particle);
        }
        
        hero.appendChild(particleContainer);
    }
    
    createCosmicParticles();
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes cosmicFloat {
            0%, 100% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-30px) translateX(10px) rotate(90deg);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-60px) translateX(-5px) rotate(180deg);
                opacity: 1;
            }
            75% {
                transform: translateY(-30px) translateX(-10px) rotate(270deg);
                opacity: 0.8;
            }
        }
        
        .loaded {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Additional cosmic effects */
        .cosmic-particle {
            transition: all 0.3s ease;
        }
        
        .cosmic-particle:hover {
            transform: scale(2);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    
    const throttledScrollHandler = throttle(function() {
        
    }, 16); // ~
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    console.log('Portfolio website loaded successfully! 🚀');
});
