/**
 * ===================================
 * PIONEERSX - CUSTOM CURSOR
 * ===================================
 */

'use strict';

/**
 * ===================================
 * CURSOR INITIALIZATION
 * ===================================
 */
class CustomCursor {
    constructor() {
        this.cursorDot = document.getElementById('cursorDot');
        this.cursorOutline = document.getElementById('cursorOutline');
        
        this.cursorX = 0;
        this.cursorY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        
        this.isVisible = false;
        this.isHovering = false;
        
        this.init();
    }
    
    /**
     * Initialize cursor
     */
    init() {
        // Check if device supports hover (not touch device)
        if (!this.isTouchDevice()) {
            this.setupEventListeners();
            this.animate();
        } else {
            // Hide cursors on touch devices
            this.cursorDot.style.display = 'none';
            this.cursorOutline.style.display = 'none';
        }
    }
    
    /**
     * Check if device is touch device
     */
    isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Mouse enter/leave window
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        
        // Mouse down/up
        document.addEventListener('mousedown', () => this.handleMouseDown());
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Setup hover elements
        this.setupHoverElements();
    }
    
    /**
     * Handle mouse move
     */
    handleMouseMove(e) {
        this.cursorX = e.clientX;
        this.cursorY = e.clientY;
        
        // Show cursors on first move
        if (!this.isVisible) {
            this.showCursor();
        }
        
        // Initialize outline position on first move
        if (this.outlineX === 0 && this.outlineY === 0) {
            this.outlineX = this.cursorX;
            this.outlineY = this.cursorY;
        }
        
        // Update dot position immediately (centered)
        const dotSize = this.getDotSize();
        this.cursorDot.style.left = (this.cursorX - dotSize / 2) + 'px';
        this.cursorDot.style.top = (this.cursorY - dotSize / 2) + 'px';
    }
    
    /**
     * Get current dot size based on state
     */
    getDotSize() {
        if (this.cursorDot.classList.contains('hover')) return 12;
        if (this.cursorDot.classList.contains('click')) return 6;
        return 8;
    }
    
    /**
     * Get current outline size based on state
     */
    getOutlineSize() {
        if (this.cursorOutline.classList.contains('hover')) return 40;
        if (this.cursorOutline.classList.contains('click')) return 25;
        return 30;
    }
    
    /**
     * Show cursor
     */
    showCursor() {
        this.isVisible = true;
        this.cursorDot.style.opacity = '1';
        this.cursorOutline.style.opacity = '1';
    }
    
    /**
     * Hide cursor
     */
    hideCursor() {
        this.isVisible = false;
        this.cursorDot.style.opacity = '0';
        this.cursorOutline.style.opacity = '0';
    }
    
    /**
     * Handle mouse down
     */
    handleMouseDown() {
        this.cursorDot.classList.add('click');
        this.cursorOutline.classList.add('click');
    }
    
    /**
     * Handle mouse up
     */
    handleMouseUp() {
        this.cursorDot.classList.remove('click');
        this.cursorOutline.classList.remove('click');
    }
    
    /**
     * Setup hover elements
     */
    setupHoverElements() {
        const hoverElements = document.querySelectorAll(`
            a, 
            button, 
            .service-card, 
            .medical-card, 
            .team-card, 
            .testimonial, 
            .case-study, 
            .process-step, 
            .client-logo, 
            .stat-item,
            input, 
            textarea, 
            select,
            .btn
        `);
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.addHoverEffect());
            element.addEventListener('mouseleave', () => this.removeHoverEffect());
        });
    }
    
    /**
     * Add hover effect
     */
    addHoverEffect() {
        this.isHovering = true;
        this.cursorDot.classList.add('hover');
        this.cursorOutline.classList.add('hover');
    }
    
    /**
     * Remove hover effect
     */
    removeHoverEffect() {
        this.isHovering = false;
        this.cursorDot.classList.remove('hover');
        this.cursorOutline.classList.remove('hover');
    }
    
    /**
     * Animate cursor outline with elastic effect
     */
    animate() {
        const distX = this.cursorX - this.outlineX;
        const distY = this.cursorY - this.outlineY;
        
        // Smooth elastic follow
        const speed = 0.18;
        this.outlineX += distX * speed;
        this.outlineY += distY * speed;
        
        // Update outline position (centered)
        const outlineSize = this.getOutlineSize();
        this.cursorOutline.style.left = (this.outlineX - outlineSize / 2) + 'px';
        this.cursorOutline.style.top = (this.outlineY - outlineSize / 2) + 'px';
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Update cursor theme
     */
    updateTheme(theme) {
        if (theme === 'light') {
            this.cursorDot.style.background = '#fff';
            this.cursorOutline.style.borderColor = '#ff1e1e';
        } else {
            this.cursorDot.style.background = '#000';
            this.cursorOutline.style.borderColor = '#ff1e1e';
        }
    }
    
    /**
     * Destroy cursor
     */
    destroy() {
        this.cursorDot.style.display = 'none';
        this.cursorOutline.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

/**
 * ===================================
 * CURSOR EFFECTS & INTERACTIONS
 * ===================================
 */
class CursorEffects {
    constructor(cursor) {
        this.cursor = cursor;
        this.init();
    }
    
    /**
     * Initialize effects
     */
    init() {
        this.setupClickRipple();
        this.setupTrailEffect();
        this.setupMagneticEffect();
    }
    
    /**
     * Setup click ripple effect
     */
    setupClickRipple() {
        document.addEventListener('click', (e) => {
            if (this.cursor.isTouchDevice()) return;
            
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                border: 2px solid var(--primary-red);
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
            `;
            
            document.body.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add ripple animation
        if (!document.getElementById('rippleStyles')) {
            const style = document.createElement('style');
            style.id = 'rippleStyles';
            style.textContent = `
                @keyframes rippleEffect {
                    to {
                        width: 50px;
                        height: 50px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Setup cursor trail effect
     */
    setupTrailEffect() {
        let lastTime = 0;
        const delay = 50; // ms between trail particles
        
        document.addEventListener('mousemove', (e) => {
            if (this.cursor.isTouchDevice()) return;
            
            const currentTime = Date.now();
            if (currentTime - lastTime < delay) return;
            lastTime = currentTime;
            
            // Only create trail when moving fast
            if (this.cursor.isHovering) return;
            
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: var(--primary-red);
                pointer-events: none;
                z-index: 9997;
                transform: translate(-50%, -50%);
                animation: trailFade 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 500);
        });
        
        // Add trail animation
        if (!document.getElementById('trailStyles')) {
            const style = document.createElement('style');
            style.id = 'trailStyles';
            style.textContent = `
                @keyframes trailFade {
                    to {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Setup magnetic effect for buttons
     */
    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, button');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (this.cursor.isTouchDevice()) return;
                
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

/**
 * ===================================
 * INITIALIZE CUSTOM CURSOR
 * ===================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = new CustomCursor();
    const cursorEffects = new CursorEffects(customCursor);
    
    // Expose to window for external access
    window.CustomCursor = customCursor;
    window.CursorEffects = cursorEffects;
});

/**
 * ===================================
 * CURSOR UTILITIES
 * ===================================
 */
const CursorUtils = {
    /**
     * Temporarily hide cursor
     */
    hide() {
        if (window.CustomCursor) {
            window.CustomCursor.hideCursor();
        }
    },
    
    /**
     * Show cursor
     */
    show() {
        if (window.CustomCursor) {
            window.CustomCursor.showCursor();
        }
    },
    
    /**
     * Change cursor theme
     */
    setTheme(theme) {
        if (window.CustomCursor) {
            window.CustomCursor.updateTheme(theme);
        }
    },
    
    /**
     * Disable cursor completely
     */
    disable() {
        if (window.CustomCursor) {
            window.CustomCursor.destroy();
        }
    }
};

// Export utilities
window.CursorUtils = CursorUtils;
