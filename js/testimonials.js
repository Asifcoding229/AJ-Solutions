// Testimonials Slider JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsSlider();
});

function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const items = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (!slider || items.length === 0) return;
    
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set up navigation buttons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Set up touch events for mobile
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // Handle swipe
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX) {
            // Swipe right
            prevSlide();
        }
    }
    
    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
    }
    
    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Update slider position and active dot
    function updateSlider() {
        // Hide all items
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        });
        
        // Show current item
        setTimeout(() => {
            items[currentIndex].style.display = 'block';
            setTimeout(() => {
                items[currentIndex].style.opacity = '1';
                items[currentIndex].style.transform = 'translateX(0)';
            }, 50);
        }, 300);
        
        // Update dots
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Initialize slider
    updateSlider();
    
    // Auto-advance slides
    setInterval(nextSlide, 6000);
    
    // Add CSS for testimonials
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Testimonials Section Styles */
        .testimonials-slider {
            position: relative;
            margin: 40px 0;
            overflow: hidden;
        }
        
        .testimonial-item {
            display: none;
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .testimonial-content {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            padding: 30px;
            box-shadow: var(--card-shadow);
            position: relative;
            overflow: hidden;
        }
        
        .testimonial-content::before {
            content: '"';
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 120px;
            color: var(--primary-color);
            opacity: 0.1;
            font-family: serif;
            line-height: 1;
        }
        
        .testimonial-text {
            position: relative;
            z-index: 1;
            margin-bottom: 20px;
        }
        
        .testimonial-text p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: var(--text-secondary);
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
            border-top: 1px solid var(--card-border);
            padding-top: 20px;
        }
        
        .author-image {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 15px;
            border: 2px solid var(--secondary-color);
        }
        
        .author-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .author-info h4 {
            margin: 0 0 5px;
            color: var(--text-primary);
            font-size: 1.1rem;
        }
        
        .author-info p {
            margin: 0 0 5px;
            color: var(--text-muted);
            font-size: 0.9rem;
        }
        
        .rating {
            color: var(--accent-color);
            font-size: 0.9rem;
        }
        
        .testimonial-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
        }
        
        .testimonial-prev,
        .testimonial-next {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-primary);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .testimonial-prev:hover,
        .testimonial-next:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
        }
        
        .testimonial-dots {
            display: flex;
            margin: 0 15px;
        }
        
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            margin: 0 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .dot.active {
            background: var(--secondary-color);
            border-color: var(--secondary-color);
            transform: scale(1.2);
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
            .testimonial-content {
                padding: 20px;
            }
            
            .testimonial-text p {
                font-size: 1rem;
            }
            
            .author-image {
                width: 50px;
                height: 50px;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}
