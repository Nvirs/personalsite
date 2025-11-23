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
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
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
    
    console.log('Portfolio loaded');
});