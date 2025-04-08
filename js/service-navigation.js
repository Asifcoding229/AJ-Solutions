// Service Page Navigation with Canva-style Animations

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service card navigation
    initServiceCardNavigation();
});

// Service Card Navigation
function initServiceCardNavigation() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get service type from data attribute
            const serviceType = this.getAttribute('data-service-type');
            if (!serviceType) return;
            
            // Start page transition animation
            startPageTransition(() => {
                // Navigate to service detail page
                window.location.href = `service-${serviceType}.html`;
            });
        });
    });
    
    // Check if we're on a service detail page
    if (window.location.pathname.includes('service-')) {
        // Add back button functionality
        const backButtons = document.querySelectorAll('.back-to-services');
        backButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Start page transition animation
                startPageTransition(() => {
                    // Navigate back to main page with services section
                    window.location.href = 'index.html#services';
                });
            });
        });
        
        // Trigger entrance animation
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    }
}

// Page Transition Animation (Canva-style)
function startPageTransition(callback) {
    // Create transition overlay if it doesn't exist
    let transitionOverlay = document.querySelector('.page-transition-overlay');
    
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition-overlay';
        document.body.appendChild(transitionOverlay);
        
        // Create inner elements for the animation
        const innerElements = `
            <div class="transition-shape shape1"></div>
            <div class="transition-shape shape2"></div>
            <div class="transition-shape shape3"></div>
        `;
        transitionOverlay.innerHTML = innerElements;
    }
    
    // Start the transition animation
    transitionOverlay.classList.add('active');
    
    // Animate shapes sequentially
    const shapes = document.querySelectorAll('.transition-shape');
    
    shapes.forEach((shape, index) => {
        setTimeout(() => {
            shape.classList.add('animate');
        }, index * 150);
    });
    
    // Execute callback after animation completes
    setTimeout(() => {
        if (typeof callback === 'function') {
            callback();
        }
    }, 1200); // Match this with the CSS animation duration
}

// Add CSS for the transition animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Page Transition Overlay */
    .page-transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
    }
    
    .page-transition-overlay.active {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }
    
    /* Transition Shapes */
    .transition-shape {
        position: absolute;
        background: var(--primary-color);
        transform: scale(0);
        border-radius: 50%;
        opacity: 0.9;
    }
    
    .transition-shape.shape1 {
        top: 50%;
        left: 50%;
        width: 300vw;
        height: 300vw;
        margin-top: -150vw;
        margin-left: -150vw;
        background: var(--primary-gradient);
        z-index: 3;
    }
    
    .transition-shape.shape2 {
        top: 50%;
        left: 50%;
        width: 250vw;
        height: 250vw;
        margin-top: -125vw;
        margin-left: -125vw;
        background: var(--secondary-gradient);
        z-index: 2;
    }
    
    .transition-shape.shape3 {
        top: 50%;
        left: 50%;
        width: 200vw;
        height: 200vw;
        margin-top: -100vw;
        margin-left: -100vw;
        background: var(--accent-gradient);
        z-index: 1;
    }
    
    /* Animation for shapes */
    .transition-shape.animate {
        animation: expand-shape 1.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }
    
    .transition-shape.shape2.animate {
        animation-delay: 0.1s;
    }
    
    .transition-shape.shape3.animate {
        animation-delay: 0.2s;
    }
    
    @keyframes expand-shape {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    
    /* Service Detail Page Animations */
    .service-detail-page {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .page-loaded .service-detail-page {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Service Detail Content Animations */
    .service-detail-content > * {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .page-loaded .service-detail-content > * {
        opacity: 1;
        transform: translateY(0);
    }
    
    .page-loaded .service-detail-content > *:nth-child(1) { transition-delay: 0.2s; }
    .page-loaded .service-detail-content > *:nth-child(2) { transition-delay: 0.3s; }
    .page-loaded .service-detail-content > *:nth-child(3) { transition-delay: 0.4s; }
    .page-loaded .service-detail-content > *:nth-child(4) { transition-delay: 0.5s; }
    .page-loaded .service-detail-content > *:nth-child(5) { transition-delay: 0.6s; }
    .page-loaded .service-detail-content > *:nth-child(6) { transition-delay: 0.7s; }
    
    /* Service Card Hover Animation Update */
    .service-card {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .service-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.1), rgba(var(--secondary-color-rgb), 0.1));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }
    
    .service-card:hover::after {
        opacity: 1;
    }
    
    .service-card .card-arrow {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        background: var(--accent-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transform: translateX(20px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .service-card:hover .card-arrow {
        transform: translateX(0);
        opacity: 1;
    }
`;
document.head.appendChild(styleSheet);

// Create service detail pages for each service
function createServiceDetailPages() {
    const services = [
        {
            type: 'graphics',
            title: 'AI-Made Graphics',
            description: 'Transform your visual communication with our cutting-edge AI-generated graphics.',
            features: [
                'Posters - Eye-catching designs for events and promotions',
                'Flyers - Impactful marketing materials that stand out',
                'Product Images - Showcase your products in their best light',
                'Wall Arts - Elevate any space with custom artwork'
            ],
            image: 'images/service-graphics.jpg'
        },
        {
            type: 'content',
            title: 'AI-Written Content',
            description: 'Elevate your brand\'s voice with our AI-powered content creation service.',
            features: [
                'Blog Posts - Engaging, SEO-optimized content',
                'Scripts - Compelling scripts for videos and presentations',
                'Articles - In-depth, authoritative pieces',
                'Website Copy - Persuasive content that converts'
            ],
            image: 'images/service-content.jpg'
        },
        {
            type: 'ads',
            title: 'AI-Made Ads',
            description: 'Transform your marketing strategy with our AI-powered video advertisements.',
            features: [
                'Social Media Ads - Eye-catching video content',
                'Product Demonstrations - Showcase features effectively',
                'Explainer Videos - Simplify complex concepts',
                'Promotional Campaigns - Full-scale video marketing'
            ],
            image: 'images/service-ads.jpg'
        },
        {
            type: 'education',
            title: 'AI Education',
            description: 'Unlock the potential of artificial intelligence with our specialized education services.',
            features: [
                '1-on-1 Consultancy - Personalized guidance',
                'AI for Income Generation - Monetization strategies',
                'YouTube Content Creation - Master AI tools for videos',
                'AI Implementation Strategy - Business integration'
            ],
            image: 'images/service-education.jpg'
        },
        {
            type: 'chatbots',
            title: 'Chatbots',
            description: 'Enhance customer engagement and streamline operations with our AI-powered chatbot solutions.',
            features: [
                'Website Chatbots - 24/7 customer assistance',
                'Instagram Chatbots - Engage your social audience',
                'E-commerce Chatbots - Convert browsers to buyers',
                'Customer Service Chatbots - Instant support'
            ],
            image: 'images/service-chatbots.jpg'
        },
        {
            type: 'data',
            title: 'Data Analysis & Visualization',
            description: 'Transform your raw data into actionable insights with our AI-powered data analysis and visualization services.',
            features: [
                'Data Processing & Cleaning - Prepare data for analysis',
                'Statistical Analysis - Uncover patterns and relationships',
                'Interactive Dashboards - Monitor metrics in real-time',
                'Data Visualization - Communicate insights effectively',
                'Predictive Analytics - Forecast future trends'
            ],
            image: 'images/service-data.jpg'
        }
    ];
    
    // This function would generate HTML files for each service
    // In a real implementation, we would write these to disk
    console.log('Service detail pages would be created for:', services.map(s => s.type).join(', '));
}

// Call this function to set up service detail pages
createServiceDetailPages();
