// AJ Solutions - Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
    });

    // Initialize cursor animation
    initCursorAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize service card animations
    initServiceCards();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize hero background animation
    initHeroBackground();
});

// Custom cursor animation
function initCursorAnimation() {
    const cursor = document.querySelector('.cursor');
    const cursorContainer = document.querySelector('.cursor-container');
    
    // Create cursor trails
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.opacity = 1 - (i * 0.2);
        cursorContainer.appendChild(trail);
    }
    
    const trails = document.querySelectorAll('.cursor-trail');
    const trailPositions = Array(trails.length).fill({ x: 0, y: 0 });
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        // Main cursor
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Update trail positions
        for (let i = trails.length - 1; i > 0; i--) {
            trailPositions[i] = { ...trailPositions[i-1] };
        }
        trailPositions[0] = { x: e.clientX, y: e.clientY };
        
        // Apply trail positions with delay
        trails.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = trailPositions[index].x + 'px';
                trail.style.top = trailPositions[index].y + 'px';
            }, index * 50);
        });
    });
    
    // Change cursor size on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'var(--secondary-color)';
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Fade in elements when they enter the viewport
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Service card animations
function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        // 3D tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate tilt angle (max 15 degrees)
            const tiltX = (mouseY / (cardRect.height / 2)) * 5;
            const tiltY = -(mouseX / (cardRect.width / 2)) * 5;
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });
}

// Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hero background animation
function initHeroBackground() {
    const heroBg = document.querySelector('.hero-bg');
    
    // Create animated shapes
    for (let i = 0; i < 15; i++) {
        createAnimatedShape(heroBg);
    }
}

// Create animated shape for hero background
function createAnimatedShape(container) {
    const shape = document.createElement('div');
    shape.classList.add('animated-shape');
    
    // Random properties
    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    // Apply styles
    shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        background: rgba(138, 79, 255, 0.05);
        border-radius: 50%;
        filter: blur(20px);
        animation: float ${duration}s ease-in-out infinite;
        animation-delay: -${delay}s;
        z-index: 0;
    `;
    
    container.appendChild(shape);
}

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Add CSS animation for floating effect
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(5deg);
        }
    }
    
    .hamburger {
        width: 30px;
        height: 20px;
        position: relative;
        cursor: pointer;
    }
    
    .hamburger span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: var(--text-primary);
        border-radius: 3px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }
    
    .hamburger span:nth-child(1) {
        top: 0px;
    }
    
    .hamburger span:nth-child(2) {
        top: 8px;
    }
    
    .hamburger span:nth-child(3) {
        top: 16px;
    }
    
    .hamburger.active span:nth-child(1) {
        top: 8px;
        transform: rotate(135deg);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
        left: -60px;
    }
    
    .hamburger.active span:nth-child(3) {
        top: 8px;
        transform: rotate(-135deg);
    }
`;
document.head.appendChild(styleSheet);
