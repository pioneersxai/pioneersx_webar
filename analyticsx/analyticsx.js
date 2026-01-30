/**
 * ===================================
 * ANALYTICSX - CUSTOM JAVASCRIPT
 * ===================================
 */

'use strict';

/**
 * ===================================
 * ANALYTICSX SPECIFIC INITIALIZATION
 * ===================================
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c📊 AnalyticsX', 'color: #ff1e1e; font-size: 24px; font-weight: bold;');
    console.log('%cPowered by PioneersX', 'color: #b0b0b0; font-size: 14px;');
    
    // Initialize AnalyticsX specific features
    initStatCounters();
    enhanceFeatureCards();
    setupPricingInteractions();
    initFAQAccordion();
    initIntegrationTagEffects();
    initUseCaseCards();
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
    const hasX = target.includes('x');
    
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
            element.textContent = displayValue + (hasPercent ? '%' : hasPlus ? '+' : hasX ? 'x' : '');
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
 * FAQ ACCORDION
 * ===================================
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * ===================================
 * INTEGRATION TAG EFFECTS
 * ===================================
 */
function initIntegrationTagEffects() {
    const integrationTags = document.querySelectorAll('.integration-tag');
    
    integrationTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Integration cards
    const integrationCards = document.querySelectorAll('.integration-card');
    
    integrationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * ===================================
 * USE CASE CARDS
 * ===================================
 */
function initUseCaseCards() {
    const useCaseCards = document.querySelectorAll('.use-case-card');
    
    useCaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.use-case-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.background = 'rgba(255, 30, 30, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.use-case-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
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
        'starterx': 'مرحباً، أريد الاشتراك في باقة StarterX - $149 لـ AnalyticsX',
        'businessx': 'مرحباً، أريد الاشتراك في باقة BusinessX - $299 لـ AnalyticsX',
        'enterprisex': 'مرحباً، أريد الاشتراك في باقة EnterpriseX - $599 لـ AnalyticsX',
        'general': 'مرحباً، أريد معرفة المزيد عن AnalyticsX'
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
window.AnalyticsX = {
    sendWhatsAppMessage,
    animateCounter
};
