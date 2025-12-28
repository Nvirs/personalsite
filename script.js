// Matrix Background Animation
class MatrixAnimation {
        constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        // ASCII karakterek: számok, betűk, szimbólumok
        this.characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        this.activeColumns = []; // Csak néhány oszlop aktív
        this.columnSpacing = 30; // Nagyobb távolság az oszlopok között
        this.characterSpacing = 20; // Nagyobb távolság a karakterek között függőlegesen
        this.charactersPerColumn = []; // Minden oszlophoz külön karakter lista
        
        this.init();
        this.animate();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.columnSpacing);
        this.drops = new Array(this.columns).fill(0);
        this.activeColumns = [];
        
        // Csak 5-8 oszlop aktív egyszerre
        const activeCount = Math.min(8, Math.floor(this.columns / 4));
        for (let i = 0; i < activeCount; i++) {
            this.activeColumns.push(Math.floor(Math.random() * this.columns));
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = `${this.fontSize}px JetBrains Mono`;
        
        // Csak az aktív oszlopokban rajzolunk
        for (let i = 0; i < this.activeColumns.length; i++) {
            const columnIndex = this.activeColumns[i];
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = columnIndex * this.columnSpacing;
            const y = this.drops[columnIndex] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            // Ha leért a képernyő aljára, újraindítjuk
            if (y > this.canvas.height && Math.random() > 0.98) {
                this.drops[columnIndex] = 0;
            }
            this.drops[columnIndex] += 0.8; // Gyorsabb mozgás, de nagyobb távolság
        }
        
        // Néha új oszlopokat aktiválunk, néha inaktívvá teszünk
        if (Math.random() > 0.95) {
            // Új oszlop aktiválása
            if (this.activeColumns.length < Math.floor(this.columns / 3)) {
                const newColumn = Math.floor(Math.random() * this.columns);
                if (!this.activeColumns.includes(newColumn)) {
                    this.activeColumns.push(newColumn);
                    this.drops[newColumn] = 0;
                }
            }
        }
        
        if (Math.random() > 0.98) {
            // Oszlop inaktívvá tétele
            if (this.activeColumns.length > 3) {
                const removeIndex = Math.floor(Math.random() * this.activeColumns.length);
                this.activeColumns.splice(removeIndex, 1);
            }
        }
        
        // Gyorsabb frissítés
        setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, 50);
    }
}

// Loading Screen Handler
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            // Hide loading screen after animation completes
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
}

// Minimal JavaScript for smooth functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize Matrix animation after a short delay
    setTimeout(() => {
        new MatrixAnimation();
    }, 1000);
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple scroll effect for navbar
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Simple fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-group, .stat, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });
    
    // Simple hover effects
    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.color = '#ffffff';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.color = '#cccccc';
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
     // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close mobile menu when clicking on nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    // Smooth scrolling navigation
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
                 const href = this.getAttribute('href');
            
            // Only prevent default for internal anchor links
            if (!href || !href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            const mainContainer = document.querySelector('.main');
            
            if (targetElement && mainContainer) {
                const offsetTop = targetElement.offsetTop - 80; // Account for nav height
                mainContainer.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Focus management
    const focusableElements = document.querySelectorAll('a, button');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '1px solid #ffffff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    class MatrixParticlePhysics {
        constructor(element) {
            this.element = element;
            this.isAnimating = false;
            this.container = null;
            this.particles = [];
            this.animationFrame = null;
            
            // Physics constants
            this.gravity = 0.4;
            this.friction = 0.98;
            this.bounce = 0.3;
            this.particleRadius = 6;
            this.collisionDamping = 0.95;
            
            // Matrix characters
            this.characters = '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            
            this.init();
        }
        
        init() {
            this.element.addEventListener('click', () => this.trigger());
            if (getComputedStyle(this.element.parentElement).position === 'static') {
                this.element.parentElement.style.position = 'relative';
            }
        }
        
        trigger() {
            // Prevent new animation if one is already running
            if (this.isAnimating) {
                return;
            }
            
            this.isAnimating = true;
            this.startParticleSimulation();
        }
        
        startParticleSimulation() {
            // Hide original image
            this.element.style.opacity = '0';
            
            // Create physics container
            this.container = document.createElement('div');
            this.container.className = 'matrix-physics-container';
            
            const rect = this.element.getBoundingClientRect();
            const parentRect = this.element.parentElement.getBoundingClientRect();
            
            this.container.style.position = 'absolute';
            this.container.style.left = (rect.left - parentRect.left) + 'px';
            this.container.style.top = (rect.top - parentRect.top) + 'px';
            this.container.style.width = rect.width + 'px';
            this.container.style.height = rect.height + 'px';
            this.container.style.pointerEvents = 'none';
            this.container.style.overflow = 'hidden';
            this.container.style.borderRadius = '50%';
            
            this.element.parentElement.appendChild(this.container);
            
            // Store bounds for circular constraint
            this.containerWidth = rect.width;
            this.containerHeight = rect.height;
            this.centerX = rect.width / 2;
            this.centerY = rect.height / 2;
            this.radius = Math.min(rect.width, rect.height) / 2;
            
            // Create particles
            this.createParticles(rect.width, rect.height);
            
            // Start physics loop
            this.lastTime = Date.now();
            this.simulate();
            
            // Auto start rebuilding after 2 seconds
            setTimeout(() => {
                this.startRebuilding();
            }, 2000);
            
            // Auto cleanup after rebuilding completes (total 5 seconds)
            setTimeout(() => {
                this.fadeOutAndRestore();
            }, 5000);
        }
        
        createParticles(width, height) {
            const particlesPerRow = 12;
            const particlesPerCol = 10;
            const spacingX = width / particlesPerRow;
            const spacingY = height / particlesPerCol;
            
            for (let row = 0; row < particlesPerCol; row++) {
                for (let col = 0; col < particlesPerRow; col++) {
                    const x = col * spacingX + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.5;
                    const y = row * spacingY + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.5;
                    
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const angle = Math.atan2(y - centerY, x - centerX);
                    const explosionForce = 2 + Math.random() * 3;
                    
                    const particle = {
                        x: x,
                        y: y,
                        originalX: x,  // Store original position for rebuilding
                        originalY: y,
                        vx: Math.cos(angle) * explosionForce + (Math.random() - 0.5) * 2,
                        vy: Math.sin(angle) * explosionForce + (Math.random() - 0.5) * 2 - 1,
                        char: this.characters[Math.floor(Math.random() * this.characters.length)],
                        element: null,
                        radius: this.particleRadius,
                        isRebuilding: false,
                        rebuildDelay: 0
                    };
                    
                    particle.element = this.createParticleElement(particle);
                    this.container.appendChild(particle.element);
                    this.particles.push(particle);
                }
            }
        }
        
        createParticleElement(particle) {
            const el = document.createElement('div');
            el.className = 'matrix-particle';
            el.textContent = particle.char;
            el.style.position = 'absolute';
            el.style.left = particle.x + 'px';
            el.style.top = particle.y + 'px';
            el.style.color = '#ffffffff';
            el.style.fontSize = '12px';
            el.style.fontFamily = 'JetBrains Mono, monospace';
            el.style.textShadow = '0 0 8px #ffffffff, 0 0 12px #ffffffff';
            el.style.transform = 'translate(-50%, -50%)';
            el.style.pointerEvents = 'none';
            el.style.userSelect = 'none';
            return el;
        }
        
        simulate() {
            if (!this.isAnimating) return;
            
            const currentTime = Date.now();
            const deltaTime = Math.min((currentTime - this.lastTime) / 16.67, 2);
            this.lastTime = currentTime;
            
            const containerHeight = parseFloat(this.container.style.height);
            const containerWidth = parseFloat(this.container.style.width);
            
            let allParticlesInPlace = true;
            
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                
                // If particle is rebuilding, move it back to original position
                if (p.isRebuilding) {
                    const dx = p.originalX - p.x;
                    const dy = p.originalY - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 0.3) {
                        allParticlesInPlace = false;
                        
                        // Stronger magnetic pull with acceleration
                        const pullStrength = 0.25 + (1 - Math.min(distance / 150, 1)) * 0.3;
                        const acceleration = (distance / 100) * pullStrength;
                        
                        p.vx += (dx / distance) * acceleration * 5;
                        p.vy += (dy / distance) * acceleration * 5;
                        
                        // Stronger damping for smoother arrival
                        p.vx *= 0.82;
                        p.vy *= 0.82;
                        
                        p.x += p.vx;
                        p.y += p.vy;
                        
                        // Color transition: white -> green -> white
                        const progress = Math.max(0, 1 - distance / 120);
                        if (progress < 0.5) {
                            // Getting closer: fade to green
                            const t = progress * 2;
                            const white = Math.floor(1 * t);
                            p.element.style.color = `rgb(${255 - white * 0.3}, 255, ${255 - white * 0.3})`;
                            p.element.style.textShadow = `0 0 ${8 + t * 4}px rgb(${255 - white * 0.3}, 255, ${255 - white  * 0.3})`;
                        } else {
                            // Arriving: fade back to white
                            const t = (progress - 0.5) * 2;
                            const white = Math.floor(1 * (1 - t));
                            p.element.style.color = `rgb(${255 - white * 0.3}, 255, ${255 - white * 0.3})`;
                            p.element.style.textShadow = `0 0 ${12 - t * 4}px rgb(${255 - white * 0.3}, 255, ${255 - white * 0.3})`;
                        }
                    } else {
                        // Snap to final position
                        p.x = p.originalX;
                        p.y = p.originalY;
                        p.vx = 0;
                        p.vy = 0;
                        p.element.style.color = '#ffffff';
                        p.element.style.textShadow = '0 0 8px #ffffff';
                    }
                } else {
                    allParticlesInPlace = false;
                    // Normal physics
                    p.vy += this.gravity * deltaTime;
                    p.x += p.vx * deltaTime;
                    p.y += p.vy * deltaTime;
                    p.vx *= this.friction;
                    p.vy *= this.friction;
                    
                    // Circular boundary collision
                    const dx = p.x - this.centerX;
                    const dy = p.y - this.centerY;
                    const distFromCenter = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distFromCenter + p.radius > this.radius) {
                        // Push particle back inside circle
                        const angle = Math.atan2(dy, dx);
                        const targetDist = this.radius - p.radius;
                        p.x = this.centerX + Math.cos(angle) * targetDist;
                        p.y = this.centerY + Math.sin(angle) * targetDist;
                        
                        // Reflect velocity (bounce off circular wall)
                        const normalX = dx / distFromCenter;
                        const normalY = dy / distFromCenter;
                        const dotProduct = p.vx * normalX + p.vy * normalY;
                        
                        p.vx -= 2 * dotProduct * normalX * this.bounce;
                        p.vy -= 2 * dotProduct * normalY * this.bounce;
                        
                        // Extra friction on circular boundary
                        if (Math.abs(p.vy) < 0.5) p.vy = 0;
                        p.vx *= 0.95;
                    }
                }
            }
            
            // Particle collisions only when not rebuilding
            if (!this.particles.some(p => p.isRebuilding)) {
                for (let pass = 0; pass < 3; pass++) {
                    for (let i = 0; i < this.particles.length; i++) {
                        for (let j = i + 1; j < this.particles.length; j++) {
                            this.handleCollision(this.particles[i], this.particles[j]);
                        }
                    }
                }
            }
            
            // Update positions
            for (const p of this.particles) {
                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';
                
                if (!p.isRebuilding && Math.random() < 0.02) {
                    p.char = this.characters[Math.floor(Math.random() * this.characters.length)];
                    p.element.textContent = p.char;
                }
            }
            
            this.animationFrame = requestAnimationFrame(() => this.simulate());
        }
        
        handleCollision(p1, p2) {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = p1.radius + p2.radius;
            
            // Prevent particles from overlapping
            if (distance < minDist) {
                if (distance === 0) {
                    // Particles at same position - separate randomly
                    const angle = Math.random() * Math.PI * 2;
                    p1.x -= Math.cos(angle) * minDist * 0.5;
                    p1.y -= Math.sin(angle) * minDist * 0.5;
                    p2.x += Math.cos(angle) * minDist * 0.5;
                    p2.y += Math.sin(angle) * minDist * 0.5;
                    return;
                }
                
                const nx = dx / distance;
                const ny = dy / distance;
                
                // Stronger separation force to prevent clumping
                const overlap = minDist - distance;
                const separationForce = overlap * 0.55; // Increased from 0.5
                const separateX = nx * separationForce;
                const separateY = ny * separationForce;
                
                p1.x -= separateX;
                p1.y -= separateY;
                p2.x += separateX;
                p2.y += separateY;
                
                // Elastic collision response
                const dvx = p2.vx - p1.vx;
                const dvy = p2.vy - p1.vy;
                const dvDotN = dvx * nx + dvy * ny;
                
                // Apply impulse to both particles
                const impulseFactor = this.collisionDamping;
                p1.vx += dvDotN * nx * impulseFactor;
                p1.vy += dvDotN * ny * impulseFactor;
                p2.vx -= dvDotN * nx * impulseFactor;
                p2.vy -= dvDotN * ny * impulseFactor;
                
                // Add slight repulsion to prevent sticking
                const repulsion = 0.3;
                p1.vx -= nx * repulsion;
                p1.vy -= ny * repulsion;
                p2.vx += nx * repulsion;
                p2.vy += ny * repulsion;
            }
        }
        
        startRebuilding() {
            // Activate particles in a wave from outside to center
            const centerX = this.containerWidth / 2;
            const centerY = this.containerHeight / 2;
            
            // Sort particles by distance from center (furthest first)
            const sortedParticles = [...this.particles].sort((a, b) => {
                const distA = Math.sqrt((a.originalX - centerX) ** 2 + (a.originalY - centerY) ** 2);
                const distB = Math.sqrt((b.originalX - centerX) ** 2 + (b.originalY - centerY) ** 2);
                return distB - distA;
            });
            
            // Activate particles with staggered delays - faster wave
            sortedParticles.forEach((particle, index) => {
                particle.rebuildDelay = index * 15; // 15ms between each particle activation
                setTimeout(() => {
                    particle.isRebuilding = true;
                    // Add initial impulse for more dynamic movement
                    const dx = particle.originalX - particle.x;
                    const dy = particle.originalY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        particle.vx = (dx / distance) * 2;
                        particle.vy = (dy / distance) * 2;
                    }
                }, particle.rebuildDelay);
            });
        }
        
        fadeOutAndRestore() {
            if (this.container) {
                this.container.style.transition = 'opacity 0.5s ease';
                this.container.style.opacity = '0';
            }
            
            setTimeout(() => {
                this.cleanup();
                this.element.style.transition = 'opacity 0.3s ease';
                this.element.style.opacity = '1';
                setTimeout(() => {
                    this.element.style.transition = '';
                    this.isAnimating = false;
                }, 300);
            }, 500);
        }
        
        cleanup() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
            
            if (this.container && this.container.parentElement) {
                this.container.parentElement.removeChild(this.container);
            }
            
            this.container = null;
            this.particles = [];
        }
    }
    
    // Text Glitch Effect Handler
    class TextGlitchEffect {
        constructor() {
            this.isGlitching = false;
            this.characters = '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            this.initTextClickHandlers();
        }
        
        initTextClickHandlers() {
            // Add click handlers to navigation text only
            const navTextElements = document.querySelectorAll('.brand-text');
            navTextElements.forEach(element => {
                element.style.cursor = 'pointer';
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.triggerGlitch();
                });
            });
        }
        
        triggerGlitch() {
            if (this.isGlitching) {
                return;
            }
            
            this.isGlitching = true;
            
            // Get all text-containing elements, excluding nested children
            const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a:not(.nav-item a), span:not(.hero-title span), li, .nav-item, .brand-text, .section-title, .project-title, .project-desc, .tech-tag');
            
            // Filter to only include leaf elements (no text-containing children)
            const textElements = Array.from(allElements).filter(el => {
                const hasTextChildren = Array.from(el.children).some(child => {
                    return child.textContent.trim().length > 0;
                });
                return !hasTextChildren && el.textContent.trim().length > 0;
            });
            
            // Store original text
            const originalTexts = new Map();
            
            textElements.forEach(el => {
                const originalText = el.textContent;
                originalTexts.set(el, originalText);
                el.classList.add('glitch-active');
            });
            
            // Glitch animation
            let glitchFrame = 0;
            const maxGlitchFrames = 30;
            
            const glitchInterval = setInterval(() => {
                textElements.forEach(el => {
                    const originalText = originalTexts.get(el);
                    let glitchedText = '';
                    
                    for (let i = 0; i < originalText.length; i++) {
                        if (originalText[i] === ' ' || originalText[i] === '\n') {
                            glitchedText += originalText[i];
                        } else if (Math.random() < 0.4) {
                            glitchedText += this.characters[Math.floor(Math.random() * this.characters.length)];
                        } else {
                            glitchedText += originalText[i];
                        }
                    }
                    
                    el.textContent = glitchedText;
                });
                
                glitchFrame++;
                
                if (glitchFrame >= maxGlitchFrames) {
                    clearInterval(glitchInterval);
                    
                    setTimeout(() => {
                        textElements.forEach(el => {
                            el.textContent = originalTexts.get(el);
                            el.classList.remove('glitch-active');
                        });
                        this.isGlitching = false;
                    }, 200);
                }
            }, 50);
        }
    }
    
    // Initialize image particle effects
    document.querySelectorAll('.avatar, .profile-img').forEach(element => {
        new MatrixParticlePhysics(element);
    });
    
    // Initialize text glitch effect
    new TextGlitchEffect();
    
    console.log('Portfolio loaded');
});