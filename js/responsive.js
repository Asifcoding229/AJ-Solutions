// Responsive Design Enhancements for AJ Solutions Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize responsive navigation
    initResponsiveNavigation();
    
    // Initialize touch device detection
    detectTouchDevice();
    
    // Add skip to content functionality
    addSkipToContentLink();
    
    // Optimize animations for different devices
    optimizeAnimationsForDevice();
    
    // Handle orientation changes
    handleOrientationChanges();
    
    // Add responsive image handling
    handleResponsiveImages();
});

// Responsive Navigation
function initResponsiveNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Add accessibility attributes
        hamburger.setAttribute('aria-controls', 'nav-links');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    }
}

// Touch Device Detection
function detectTouchDevice() {
    const isTouchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Disable hover-only effects
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .cursor-animation {
                display: none !important;
            }
            
            .service-card:hover {
                transform: none;
            }
            
            .service-card:active {
                transform: translateY(-10px);
            }
        `;
        document.head.appendChild(styleElement);
        
        // Add touch-specific event handlers
        document.querySelectorAll('.service-card, .portfolio-item, .btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
}

// Skip to Content Link for Accessibility
function addSkipToContentLink() {
    // Create skip link if it doesn't exist
    if (!document.querySelector('.skip-to-content')) {
        const skipLink = document.createElement('a');
        skipLink.classList.add('skip-to-content');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to content';
        document.body.prepend(skipLink);
        
        // Add id to main content area
        const mainContent = document.querySelector('main') || document.querySelector('section:first-of-type');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
}

// Optimize Animations for Different Devices
function optimizeAnimationsForDevice() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        
        // Disable animations
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            * {
                animation-duration: 0.001s !important;
                transition-duration: 0.001s !important;
            }
            
            .animated-shape,
            .cursor-trail,
            .hero-bg-shape {
                display: none !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Check device performance
    const isLowPerformanceDevice = checkLowPerformanceDevice();
    
    if (isLowPerformanceDevice) {
        document.body.classList.add('low-performance');
        
        // Reduce animation complexity
        document.querySelectorAll('.animated-shape').forEach(shape => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        });
        
        // Limit number of particles
        const cursorTrails = document.querySelectorAll('.cursor-trail');
        for (let i = 2; i < cursorTrails.length; i++) {
            if (cursorTrails[i].parentNode) {
                cursorTrails[i].parentNode.removeChild(cursorTrails[i]);
            }
        }
    }
}

// Check if device is likely low performance
function checkLowPerformanceDevice() {
    // Simple heuristic based on device memory and processor cores
    if (navigator.deviceMemory && navigator.hardwareConcurrency) {
        return navigator.deviceMemory < 4 || navigator.hardwareConcurrency < 4;
    }
    
    // Fallback to user agent sniffing for older devices
    const ua = navigator.userAgent.toLowerCase();
    return /android 4/.test(ua) || /iphone os [789]_/.test(ua);
}

// Handle Orientation Changes
function handleOrientationChanges() {
    window.addEventListener('orientationchange', function() {
        // Adjust hero height for landscape mode on mobile
        const hero = document.querySelector('.hero');
        
        if (hero) {
            if (window.orientation === 90 || window.orientation === -90) {
                // Landscape
                hero.style.height = 'auto';
                hero.style.minHeight = '100vh';
            } else {
                // Portrait
                hero.style.height = '100vh';
                hero.style.minHeight = 'auto';
            }
        }
        
        // Recalculate any position-dependent elements
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    });
}

// Responsive Image Handling
function handleResponsiveImages() {
    // Check for IntersectionObserver support
    if ('IntersectionObserver' in window) {
        // Lazy load images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // Add responsive image handling for background images
    document.querySelectorAll('[data-bg]').forEach(element => {
        const bg = element.getAttribute('data-bg');
        if (bg) {
            element.style.backgroundImage = `url(${bg})`;
        }
    });
}

// Add responsive table handling
document.querySelectorAll('table').forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('table-responsive');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust any elements that need dynamic resizing
    adjustServiceCardHeight();
});

// Ensure service cards have equal height in each row
function adjustServiceCardHeight() {
    // Only apply on larger screens
    if (window.innerWidth >= 768) {
        const cards = document.querySelectorAll('.service-card');
        const rows = {};
        
        // Reset heights
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Group cards by row
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const row = Math.floor(rect.top);
            
            if (!rows[row]) {
                rows[row] = [];
            }
            
            rows[row].push(card);
        });
        
        // Set equal height for each row
        Object.values(rows).forEach(rowCards => {
            let maxHeight = 0;
            
            rowCards.forEach(card => {
                maxHeight = Math.max(maxHeight, card.offsetHeight);
            });
            
            rowCards.forEach(card => {
                card.style.height = maxHeight + 'px';
            });
        });
    }
}

// Initialize equal height adjustment
adjustServiceCardHeight();
