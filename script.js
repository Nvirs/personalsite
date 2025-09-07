
document.addEventListener('DOMContentLoaded', function() {
   
    const spaceObjects = [];
    const STAR_COUNT = 200;
    const PLANET_COUNT = 5;
    
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
            gradient.addColorStop(0, `hsla(${this.color}, ${this.opacity})`);
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
    const ctx = canvas.getContext('2d');
    
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
            const meteorsContainer = background.querySelector('.meteors');
            const floatingContainer = background.querySelector('.floating-objects');
            
    // Create stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 3;
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        starsContainer.appendChild(star);
        
        
        setTimeout(() => {
            star.style.opacity = '1';
        }, delay * 1000);
            }
            
   
    for (let i = 0; i < 8; i++) {
        const obj = document.createElement('div');
        obj.className = 'floating-circle';
        const size = Math.random() * 60 + 40;
        const delay = Math.random() * 5;
        obj.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 15 + 20}s infinite ease-in-out;
            animation-delay: ${delay}s;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        floatingContainer.appendChild(obj);
        
     
        setTimeout(() => {
            obj.style.opacity = '1';
        }, delay * 1000);
            }
            

    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        const startX = Math.random() * 100;
        
        meteor.style.cssText = `
            left: ${startX}%;
            top: -5%;
            opacity: 0;
            transition: transform 2s linear, opacity 0.3s ease;
        `;
        
        meteorsContainer.appendChild(meteor);
        
    
        requestAnimationFrame(() => {
            meteor.style.opacity = '1';
            meteor.style.transform = `
                translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px)
                rotate(45deg)
            `;
        });
        
      
        setTimeout(() => {
            meteor.style.opacity = '0';
            setTimeout(() => meteor.remove(), 300);
        }, 1700);
            }
            
            
            setInterval(() => {
                if (Math.random() < 0.2) {
                    createMeteor();
                }
            }, 1500);
        });
    }
    
    
    initializeSpaceEffects();
    
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const bg = document.getElementById('vanta-bg');
        if (bg) {
    
            bg.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        
        document.querySelectorAll('.section-space-bg').forEach(bg => {
            const rect = bg.parentElement.getBoundingClientRect();
            const speed = 0.1;
            const yPos = (rect.top * speed);
            bg.style.transform = `translateY(${yPos}px)`;
        });
    });

    
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
    
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset;
        scrollSpeed = (st - lastScrollTop) * 0.1;
        lastScrollTop = st;
        
        
        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const yPos = -(st * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        // Update nebulas
        document.querySelectorAll('.nebula').forEach((nebula, index) => {
            const rotation = st * 0.02 * (index + 1);
            const scale = 1 + Math.sin(st * 0.001) * 0.1;
            nebula.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        });
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
    
    
    const constellations = new Constellation(stars.slice(0, 50));
    
    
    let animationFrameId;
    let lastTime = 0;
    const FPS = 60;
    const frameDelay = 1000 / FPS;

    function animate(currentTime) {
        animationFrameId = requestAnimationFrame(animate);

        
        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameDelay) return;

        
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.fillStyle = 'rgba(10, 10, 31, 0.2)';
        ctx.fillRect(0, 0, width, height);
        
        
        stars.forEach(star => {
            star.update(mouseX, mouseY, scrollSpeed);
            star.draw();
        });
        
        
        if (constellations && typeof constellations.draw === 'function') {
            constellations.draw();
        }
        
        
        scrollSpeed *= 0.95;
        
        lastTime = currentTime;
    }
    
   
    function startAnimation() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }
    
  
    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });
    
    
    startAnimation();
    
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
   
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
   
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
    
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    
    function createSpaceBackground() {
        createStars();
        createStarbursts();
        createMeteors();
    }
    
   
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const starCount = 150;
        
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
        const starburstCount = 20;
        
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
    
  
    function createMeteors() {
        const meteorsContainer = document.getElementById('meteors');
        
        function createMeteor() {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.left = Math.random() * 100 + '%';
            meteor.style.top = Math.random() * 100 + '%';
            meteor.style.animationDuration = (Math.random() * 2 + 2) + 's';
            meteor.style.animationDelay = Math.random() * 5 + 's';
            
            meteorsContainer.appendChild(meteor);
            
            
            setTimeout(() => {
                if (meteor.parentNode) {
                    meteor.parentNode.removeChild(meteor);
                }
            }, 5000);
        }
        
        
        setInterval(createMeteor, 2000);
        
        
        for (let i = 0; i < 3; i++) {
            setTimeout(createMeteor, i * 1000);
        }
    }
    
    
    function createFloatingShapes() {
        const shapesContainer = document.querySelector('.floating-shapes');
        const existingShapes = shapesContainer.querySelectorAll('.shape');
        
        
        existingShapes.forEach(shape => shape.remove());
        
        
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            shape.style.width = Math.random() * 100 + 50 + 'px';
            shape.style.height = shape.style.width;
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 6 + 's';
            shape.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            // Random blur effect
            const blurIntensity = Math.random() * 10 + 5;
            shape.style.filter = `blur(${blurIntensity}px)`;
            
            shapesContainer.appendChild(shape);
        }
    }
    
    
    createSpaceBackground();
    
    
    createFloatingShapes();
    
    
    setInterval(createFloatingShapes, 15000);
    
    
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
    
   
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    
    document.querySelectorAll('a, button, .project-card, .timeline-content').forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(99, 102, 241, 0.8)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(99, 102, 241, 0.5)';
        });
    });
    
    
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
    
    
    function addRandomBlur() {
        const elements = document.querySelectorAll('.shape, .project-placeholder, .image-placeholder');
        elements.forEach(el => {
            const blurValue = Math.random() * 3 + 1;
            el.style.filter = `blur(${blurValue}px)`;
        });
    }
    
   
    addRandomBlur();
    
    
    setInterval(addRandomBlur, 10000);
    
    
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
        
       
        for (let i = 0; i < 30; i++) {
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
