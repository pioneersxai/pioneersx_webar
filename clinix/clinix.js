/**
 * ===================================
 * CLINIX - CUSTOM JAVASCRIPT
 * ===================================
 */

'use strict';

/**
 * ===================================
 * CLINIX SPECIFIC INITIALIZATION
 * ===================================
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🏥 CliniX', 'color: #ff1e1e; font-size: 24px; font-weight: bold;');
    console.log('%cPowered by PioneersX', 'color: #b0b0b0; font-size: 14px;');
    
    // Initialize CliniX specific features
    initStatCounters();
    enhanceFeatureCards();
    setupPricingInteractions();
});

/**
 * ===================================
 * STAT COUNTERS ANIMATION
 * ===================================
 */
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                animateCounter(entry.target);
                entry.target.dataset.counted = 'true';
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Animate individual counter
 */
function animateCounter(element) {
    const target = element.textContent;
    const hasPercent = target.includes('%');
    const hasPlus = target.includes('+');
    
    // Extract numeric value
    const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericValue) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            let displayValue = Math.floor(current * 10) / 10;
            element.textContent = displayValue + (hasPercent ? '%' : hasPlus ? '+' : '');
        }
    }, stepTime);
}

/**
 * ===================================
 * FEATURE CARDS ENHANCEMENT
 * ===================================
 */
function enhanceFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * ===================================
 * PRICING INTERACTIONS
 * ===================================
 */
function setupPricingInteractions() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                // Highlight the card temporarily
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
}

/**
 * ===================================
 * WHATSAPP MESSAGE CUSTOMIZATION
 * ===================================
 */
function sendWhatsAppMessage(plan = 'general') {
    const messages = {
        'starter': 'مرحباً، أريد الاشتراك في باقة Starter لـ CliniX',
        'professional': 'مرحباً، أريد الاشتراك في باقة Professional لـ CliniX',
        'enterprise': 'مرحباً، أريد معرفة المزيد عن باقة Enterprise لـ CliniX',
        'general': 'مرحباً، أريد معرفة المزيد عن نظام CliniX'
    };
    
    const message = messages[plan] || messages['general'];
    const whatsappUrl = `https://wa.me/9665477705498?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

/**
 * ===================================
 * SMOOTH REVEAL ON SCROLL
 * ===================================
 */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    revealObserver.observe(el);
});

/**
 * ===================================
 * BADGE HOVER EFFECTS
 * ===================================
 */
const badges = document.querySelectorAll('.badge');
badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

/**
 * ===================================
 * EXPORT FUNCTIONS
 * ===================================
 */
window.CliniX = {
    sendWhatsAppMessage,
    animateCounter
};
