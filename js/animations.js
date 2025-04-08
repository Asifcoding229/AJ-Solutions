// Advanced Animation Effects for AJ Solutions Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced cursor animation
    initEnhancedCursor();
    
    // Initialize text animations
    initTextAnimations();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize hero background shapes
    createHeroBackgroundShapes();
    
    // Initialize service card 3D effects
    initServiceCard3DEffects();
    
    // Initialize form animations
    initFormAnimations();
    
    // Initialize scroll animations with IntersectionObserver
    initAdvancedScrollAnimations();
});

// Enhanced cursor animation
function initEnhancedCursor() {
    // Create cursor elements if they don't exist
    if (!document.querySelector('.cursor-animation')) {
        const cursorAnimation = document.createElement('div');
        cursorAnimation.classList.add('cursor-animation');
        
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        
        const cursorCircle = document.createElement('div');
        cursorCircle.classList.add('cursor-circle');
        
        cursorAnimation.appendChild(cursorDot);
        cursorAnimation.appendChild(cursorCircle);
        
        // Create trail elements
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.opacity = 0.7 - (i * 0.1);
            cursorAnimation.appendChild(trail);
        }
        
        document.body.appendChild(cursorAnimation);
    }
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const trails = document.querySelectorAll('.cursor-trail');
    
    // Store trail positions
    const trailPositions = Array(trails.length).fill({ x: 0, y: 0 });
    
    // Mouse move event
    document.addEventListener('mousemove', function(e) {
        // Update main cursor elements
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // Add slight delay to circle for smooth effect
        setTimeout(() => {
            cursorCircle.style.left = `${e.clientX}px`;
            cursorCircle.style.top = `${e.clientY}px`;
        }, 50);
        
        // Update trail positions with cascading delay
        for (let i = trails.length - 1; i > 0; i--) {
            trailPositions[i] = { ...trailPositions[i-1] };
        }
        trailPositions[0] = { x: e.clientX, y: e.clientY };
        
        // Apply trail positions with delay
        trails.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = `${trailPositions[index].x}px`;
                trail.style.top = `${trailPositions[index].y}px`;
            }, index * 60);
        });
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, input, textarea, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorCircle.style.width = '60px';
            cursorCircle.style.height = '60px';
            cursorCircle.style.borderColor = 'var(--accent-color)';
            
            // Add slight scale to trails
            trails.forEach(trail => {
                trail.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
        });
        
        element.addEventListener('mouseleave', function() {
            cursorCircle.style.width = '40px';
            cursorCircle.style.height = '40px';
            cursorCircle.style.borderColor = 'var(--secondary-color)';
            
            // Reset trail scale
            trails.forEach(trail => {
                trail.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
        cursorCircle.style.opacity = '0';
        trails.forEach(trail => {
            trail.style.opacity = '0';
        });
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
        cursorCircle.style.opacity = '1';
        trails.forEach((trail, index) => {
            trail.style.opacity = 0.7 - (index * 0.1);
        });
    });
}

// Text animations
function initTextAnimations() {
    // Split text into individual spans for animation
    const animatedTextElements = document.querySelectorAll('.hero h1, .hero p, .section-title h2');
    
    animatedTextElements.forEach(element => {
        // Add animated-text class if not already present
        if (!element.classList.contains('animated-text')) {
            element.classList.add('animated-text');
            
            // Get the text content
            const text = element.textContent;
            element.textContent = '';
            
            // Create spans for each word
            text.split(' ').forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = word + ' ';
                element.appendChild(wordSpan);
            });
        }
    });
    
    // Trigger animation when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.animated-text').forEach(element => {
        observer.observe(element);
    });
}

// Parallax effects
function initParallaxEffects() {
    // Add parallax class to sections that should have parallax effect
    const sections = document.querySelectorAll('.hero, .about, .services, .portfolio, .contact');
    
    sections.forEach(section => {
        if (!section.classList.contains('parallax')) {
            section.classList.add('parallax');
            
            // Create parallax background element
            const parallaxBg = document.createElement('div');
            parallaxBg.classList.add('parallax-bg');
            section.prepend(parallaxBg);
        }
    });
    
    // Update parallax effect on scroll
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            const parent = bg.parentElement;
            const scrollPosition = window.pageYOffset;
            const parentOffset = parent.offsetTop;
            const parentHeight = parent.offsetHeight;
            
            // Calculate parallax offset
            if (scrollPosition + window.innerHeight > parentOffset && 
                scrollPosition < parentOffset + parentHeight) {
                const relativeScroll = (scrollPosition - parentOffset) * 0.3;
                bg.style.transform = `translateY(${relativeScroll}px)`;
            }
        });
    });
}

// Create hero background shapes
function createHeroBackgroundShapes() {
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        // Create animated background shapes
        const shapes = [
            { class: 'shape-1', size: 300 },
            { class: 'shape-2', size: 200 },
            { class: 'shape-3', size: 250 }
        ];
        
        shapes.forEach(shape => {
            const element = document.createElement('div');
            element.classList.add('hero-bg-shape', shape.class);
            heroBg.appendChild(element);
        });
    }
}

// Service card 3D effects
function initServiceCard3DEffects() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation values
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Add highlight effect based on mouse position
            const highlight = document.createElement('div');
            highlight.style.position = 'absolute';
            highlight.style.top = '0';
            highlight.style.left = '0';
            highlight.style.width = '100%';
            highlight.style.height = '100%';
            highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
            highlight.style.pointerEvents = 'none';
            
            // Remove any existing highlights
            card.querySelectorAll('.card-highlight').forEach(el => el.remove());
            
            highlight.classList.add('card-highlight');
            card.appendChild(highlight);
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            
            // Remove highlight effect
            card.querySelectorAll('.card-highlight').forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 300);
            });
        });
    });
}

// Form animations
function initFormAnimations() {
    const formElements = document.querySelectorAll('.form-control');
    
    formElements.forEach(element => {
        // Focus animation
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Blur animation
        element.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (element.value !== '') {
            element.parentElement.classList.add('focused');
        }
    });
    
    // Form submit animation
    const form = document.querySelector('.contact-form');
    
    if (form) {
        // Add loading spinner to submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const loadingSpinner = document.createElement('span');
        loadingSpinner.classList.add('loading-spinner');
        submitBtn.appendChild(loadingSpinner);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading class
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.textContent = 'Message sent successfully!';
                successMessage.style.color = 'var(--success-color)';
                successMessage.style.marginTop = '1rem';
                
                // Remove any existing messages
                form.querySelectorAll('.form-success, .form-error').forEach(el => el.remove());
                
                form.appendChild(successMessage);
                
                // Reset form
                form.reset();
                form.querySelectorAll('.focused').forEach(el => el.classList.remove('focused'));
            }, 2000);
        });
    }
}

// Advanced scroll animations with IntersectionObserver
function initAdvancedScrollAnimations() {
    // Add fade-up class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .about-text p, .about-image, .portfolio-item, .contact-form .form-group');
    
    animateElements.forEach((element, index) => {
        if (!element.classList.contains('fade-up')) {
            element.classList.add('fade-up');
            
            // Add sequential delay classes
            const delayClass = `fade-in-delay-${(index % 5) + 1}`;
            element.classList.add(delayClass);
        }
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with fade-up class
    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });
}

// Page transition effects
function initPageTransitions() {
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    document.body.appendChild(pageTransition);
    
    // Add event listeners to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href');
            
            // Trigger transition animation
            pageTransition.classList.add('active');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.hash = target;
                pageTransition.classList.remove('active');
            }, 500);
        });
    });
}

// Initialize page transitions
initPageTransitions();

// Add accessibility feature for reduced motion
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
}

// Check on load and when preference changes
checkReducedMotion();
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkReducedMotion);
