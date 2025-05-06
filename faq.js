document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize category filtering
    initCategories();
});

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Add ripple effect
            createRipple(event, question);
        });
    });
}

function initSearch() {
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.faq-item');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                // Highlight matching text
                highlightText(item, searchTerm);
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function initCategories() {
    const categoryBtns = document.querySelectorAll('.tab-btn');
    const faqGroups = document.querySelectorAll('.faq-group');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter FAQ items
            faqGroups.forEach(group => {
                if (category === 'all' || group.dataset.category === category) {
                    group.style.display = 'block';
                    // Add animation
                    group.style.animation = 'slideIn 0.5s ease-out';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

function highlightText(element, searchTerm) {
    const question = element.querySelector('h3');
    const answer = element.querySelector('.faq-answer p');
    
    const highlightedQuestion = question.textContent.replace(
        new RegExp(searchTerm, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    const highlightedAnswer = answer.textContent.replace(
        new RegExp(searchTerm, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    question.innerHTML = highlightedQuestion;
    answer.innerHTML = highlightedAnswer;
}

// Add smooth scrolling for contact button
document.querySelector('.contact-btn').addEventListener('click', () => {
    // Add your contact form logic here
    console.log('Contact button clicked');
});

// Add this CSS for the ripple effect and highlights
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    .highlight {
        background: #ffeb3b;
        padding: 0 2px;
        border-radius: 2px;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);
