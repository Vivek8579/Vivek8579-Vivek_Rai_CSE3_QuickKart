// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initStickyHeader();
    initSmoothScroll();
    initAnimations();
    initTeamHover();
    initCounterAnimation();
    initTestimonialSlider();
    initNewsletterValidation();
});

// Sticky Header Implementation
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Smooth Scroll Implementation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Team Member Hover Effects
function initTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-bio').style.transform = 'translateY(0)';
        });

        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-bio').style.transform = 'translateY(100%)';
        });
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const steps = 50;
                const stepValue = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += stepValue;
                    entry.target.textContent = Math.round(current);

                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    }
                }, duration / steps);

                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Testimonial Slider
function initTestimonialSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next and Previous buttons
    document.querySelector('.slider-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });

    document.querySelector('.slider-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);
}

// Newsletter Form Validation
function initNewsletterValidation() {
    const form = document.querySelector('.newsletter-form');
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button');

    emailInput.addEventListener('input', function() {
        const isValid = this.checkValidity();
        submitButton.disabled = !isValid;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (emailInput.checkValidity()) {
            // Show success message
            showNotification('Thank you for subscribing!', 'success');
            
            // Simulate API call
            setTimeout(() => {
                form.reset();
                submitButton.disabled = true;
            }, 1000);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add this CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        background: #333;
        color: white;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        background: #2ecc71;
    }

    .notification.error {
        background: #e74c3c;
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);


