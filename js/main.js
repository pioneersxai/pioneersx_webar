/**
 * ===================================
 * PIONEERSX - MAIN JAVASCRIPT
 * ===================================
 */

'use strict';

/**
 * ===================================
 * PAGE LOADER
 * ===================================
 */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

/**
 * ===================================
 * NAVBAR SCROLL EFFECT
 * ===================================
 */
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

/**
 * ===================================
 * MOBILE MENU TOGGLE
 * ===================================
 */
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

/**
 * ===================================
 * SMOOTH SCROLLING
 * ===================================
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * ===================================
 * SCROLL TO TOP BUTTON
 * ===================================
 */
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/**
 * ===================================
 * CONTACT FORM SUBMISSION
 * ===================================
 */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Create WhatsApp message
    const message = createWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/9665477705498?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification('success', 'شكراً لتواصلك معنا! سيتم فتح واتساب لإكمال المحادثة.');
    
    // Reset form
    contactForm.reset();
});

/**
 * Validate form data
 */
function validateForm(data) {
    // Check required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
        showNotification('error', 'الرجاء ملء جميع الحقول المطلوبة');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'الرجاء إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('error', 'الرجاء إدخال رقم هاتف صحيح');
        return false;
    }
    
    return true;
}

/**
 * Create WhatsApp message from form data
 */
function createWhatsAppMessage(data) {
    return `مرحباً، أريد التواصل معكم:

الاسم: ${data.name}
البريد الإلكتروني: ${data.email}
الهاتف: ${data.phone}
الشركة: ${data.company || 'غير محدد'}
الخدمة المطلوبة: ${getServiceName(data.service)}
الرسالة: ${data.message}`;
}

/**
 * Get service name in Arabic
 */
function getServiceName(value) {
    const services = {
        'medical': 'حلول طبية ذكية',
        'automation': 'أتمتة العمليات',
        'consultation': 'استشارات ذكاء اصطناعي',
        'development': 'تطوير تطبيقات',
        'other': 'أخرى'
    };
    return services[value] || 'غير محدد';
}

/**
 * ===================================
 * NOTIFICATION SYSTEM
 * ===================================
 */
function showNotification(type, message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/**
 * ===================================
 * COUNTER ANIMATION FOR STATS
 * ===================================
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const is247 = target.includes('/');
        
        // Extract numeric value
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        
        if (isNaN(numericTarget)) return;
        
        let current = 0;
        const increment = numericTarget / 50;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= numericTarget) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                if (is247) {
                    counter.textContent = '24/7';
                } else {
                    counter.textContent = Math.floor(current) + (isPercentage ? '%' : isPlus ? '+' : '');
                }
            }
        }, stepTime);
    });
}

/**
 * ===================================
 * DYNAMIC YEAR IN FOOTER
 * ===================================
 */
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} PioneerX. جميع الحقوق محفوظة.`;
}

/**
 * ===================================
 * DETECT USER COUNTRY FOR LOCALIZATION
 * ===================================
 */
async function detectUserCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.log('Could not detect country:', error);
        return 'SA'; // Default to Saudi Arabia
    }
}

/**
 * ===================================
 * LAZY LOADING IMAGES
 * ===================================
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * ===================================
 * PERFORMANCE MONITORING
 * ===================================
 */
if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
}

/**
 * ===================================
 * CONSOLE MESSAGE
 * ===================================
 */
console.log('%c🚀 PioneerX', 'color: #ff1e1e; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️ by PioneerX Team', 'color: #b0b0b0; font-size: 14px;');
console.log('%c👨‍💻 Interested in working with us? Visit: https://pioneersx.store', 'color: #2563eb; font-size: 12px;');

/**
 * ===================================
 * EXPORT FUNCTIONS FOR USE IN OTHER MODULES
 * ===================================
 */
window.PioneerX = {
    showNotification,
    detectUserCountry,
    animateCounters
};
