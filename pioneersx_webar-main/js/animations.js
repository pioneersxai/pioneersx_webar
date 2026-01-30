/**
 * ===================================
 * PIONEERSX - ANIMATIONS JAVASCRIPT
 * ===================================
 */

'use strict';

/**
 * ===================================
 * SCROLL ANIMATIONS
 * ===================================
 */
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    /**
     * Initialize scroll animations
     */
    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimation();
        this.setupParallaxEffect();
        this.setupRevealAnimations();
    }
    
    /**
     * Setup Intersection Observer for scroll animations
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for browsers that don't support Intersection Observer
            this.showAllElements();
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger special animations based on element type
                    this.triggerSpecialAnimation(entry.target);
                    
                    // Unobserve after animation (optional - comment out to re-trigger on scroll)
                    // observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll(`
            .fade-in, 
            .slide-in-left, 
            .slide-in-right,
            .scale-in
        `);
        
        animatedElements.forEach(element => observer.observe(element));
    }
    
    /**
     * Show all elements (fallback)
     */
    showAllElements() {
        const elements = document.querySelectorAll(`
            .fade-in, 
            .slide-in-left, 
            .slide-in-right,
            .scale-in
        `);
        
        elements.forEach(element => element.classList.add('visible'));
    }
    
    /**
     * Trigger special animations based on element type
     */
    triggerSpecialAnimation(element) {
        // Counter animation for stats
        if (element.classList.contains('stat-item') && !element.dataset.animated) {
            element.dataset.animated = 'true';
            const counter = element.querySelector('.stat-number');
            if (counter) {
                this.animateCounter(counter);
            }
        }
        
        // Stagger children animation
        if (element.classList.contains('services-grid') || 
            element.classList.contains('medical-grid') ||
            element.classList.contains('team-grid')) {
            this.staggerChildren(element);
        }
    }
    
    /**
     * Animate counter
     */
    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const is247 = target.includes('/');
        
        // Special handling for 24/7
        if (is247) {
            element.textContent = '24/7';
            return;
        }
        
        // Extract numeric value
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        
        if (isNaN(numericTarget)) return;
        
        let current = 0;
        const increment = numericTarget / 60;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + 
                    (isPercentage ? '%' : isPlus ? '+' : '');
            }
        }, stepTime);
    }
    
    /**
     * Stagger children animation
     */
    staggerChildren(parent) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('visible');
            }, index * 100);
        });
    }
    
    /**
     * Setup parallax effect
     */
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    /**
     * Setup reveal animations for sections
     */
    setupRevealAnimations() {
        const sections = document.querySelectorAll('.section');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                }
            });
        }, {
            threshold: 0.15
        });
        
        sections.forEach(section => revealObserver.observe(section));
    }
    
    /**
     * Setup counter animation for stats section
     */
    setupCounterAnimation() {
        const statsSection = document.querySelector('.stats');
        
        if (!statsSection) return;
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsSection.dataset.animated) {
                    statsSection.dataset.animated = 'true';
                    
                    // Animate all counters
                    const counters = statsSection.querySelectorAll('.stat-number');
                    counters.forEach(counter => this.animateCounter(counter));
                    
                    // Unobserve after animation
                    statsObserver.unobserve(statsSection);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statsObserver.observe(statsSection);
    }
}

/**
 * ===================================
 * CARD ANIMATIONS
 * ===================================
 */
class CardAnimations {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize card animations
     */
    init() {
        this.setupHoverEffects();
        this.setupTiltEffect();
    }
    
    /**
     * Setup hover effects for cards
     */
    setupHoverEffects() {
        const cards = document.querySelectorAll(`
            .service-card,
            .medical-card,
            .team-card,
            .testimonial,
            .case-study
        `);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.applyHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }
    
    /**
     * Apply hover effect
     */
    applyHoverEffect(card) {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    /**
     * Remove hover effect
     */
    removeHoverEffect(card) {
        // Reset to default
    }
    
    /**
     * Setup 3D tilt effect for cards
     */
    setupTiltEffect() {
        const tiltCards = document.querySelectorAll('.service-card, .medical-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.05, 1.05, 1.05)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

/**
 * ===================================
 * TEXT ANIMATIONS
 * ===================================
 */
class TextAnimations {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize text animations
     */
    init() {
        this.setupTypingEffect();
        this.setupGradientText();
    }
    
    /**
     * Setup typing effect for hero title
     */
    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero h1');
        
        if (!heroTitle || heroTitle.dataset.typed) return;
        
        // Mark as typed to prevent re-animation
        heroTitle.dataset.typed = 'true';
        
        // Already displayed, just add animation class
        setTimeout(() => {
            heroTitle.style.animation = 'fadeInUp 1s ease';
        }, 100);
    }
    
    /**
     * Setup gradient text effect
     */
    setupGradientText() {
        const gradientTexts = document.querySelectorAll('.gradient-text');
        
        gradientTexts.forEach(text => {
            text.style.background = 'linear-gradient(90deg, var(--primary-red), var(--secondary-blue), var(--primary-red))';
            text.style.backgroundSize = '200% auto';
            text.style.webkitBackgroundClip = 'text';
            text.style.webkitTextFillColor = 'transparent';
            text.style.animation = 'gradientShift 3s ease infinite';
        });
    }
}

/**
 * ===================================
 * LOADING ANIMATIONS
 * ===================================
 */
class LoadingAnimations {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize loading animations
     */
    init() {
        this.setupSkeletonLoading();
        this.setupProgressBar();
    }
    
    /**
     * Setup skeleton loading for images
     */
    setupSkeletonLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    }
    
    /**
     * Setup page load progress bar
     */
    setupProgressBar() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.id = 'pageLoadProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: var(--primary-red);
            z-index: 99999;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    progressBar.style.opacity = '0';
                    setTimeout(() => progressBar.remove(), 300);
                }, 500);
            }
            
            progressBar.style.width = progress + '%';
        }, 200);
    }
}

/**
 * ===================================
 * PAGE TRANSITION ANIMATIONS
 * ===================================
 */
class PageTransitions {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize page transitions
     */
    init() {
        this.setupLinkTransitions();
    }
    
    /**
     * Setup smooth transitions for internal links
     */
    setupLinkTransitions() {
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if external or anchor link
                if (href.startsWith('#') || link.target === '_blank') return;
                
                e.preventDefault();
                
                // Fade out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }
}

/**
 * ===================================
 * INITIALIZE ALL ANIMATIONS
 * ===================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimations();
    
    // Initialize card animations
    const cardAnimations = new CardAnimations();
    
    // Initialize text animations
    const textAnimations = new TextAnimations();
    
    // Initialize loading animations
    const loadingAnimations = new LoadingAnimations();
    
    // Initialize page transitions
    const pageTransitions = new PageTransitions();
    
    // Expose to window for external access
    window.Animations = {
        scroll: scrollAnimations,
        cards: cardAnimations,
        text: textAnimations,
        loading: loadingAnimations,
        transitions: pageTransitions
    };
    
    console.log('✨ All animations initialized successfully!');
});

/**
 * ===================================
 * ANIMATION UTILITIES
 * ===================================
 */
const AnimationUtils = {
    /**
     * Animate element with custom animation
     */
    animate(element, animation, duration = '1s') {
        return new Promise((resolve) => {
            element.style.animation = `${animation} ${duration} ease`;
            
            element.addEventListener('animationend', () => {
                element.style.animation = '';
                resolve();
            }, { once: true });
        });
    },
    
    /**
     * Fade in element
     */
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },
    
    /**
     * Fade out element
     */
    fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
        
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    },
    
    /**
     * Slide in element
     */
    slideIn(element, direction = 'up', duration = 300) {
        const directions = {
            up: 'translateY(20px)',
            down: 'translateY(-20px)',
            left: 'translateX(20px)',
            right: 'translateX(-20px)'
        };
        
        element.style.transform = directions[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.transform = 'translate(0, 0)';
            element.style.opacity = '1';
        }, 10);
    },
    
    /**
     * Pulse animation
     */
    pulse(element) {
        element.style.animation = 'pulse 0.5s ease';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
};

// Export utilities
window.AnimationUtils = AnimationUtils;
