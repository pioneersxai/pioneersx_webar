/**
 * PIONEERSX API CLIENT - STABILIZED VERSION
 * Handles all backend communication with https://api.pioneersx.store/api
 * Updated: March 13, 2026
 */

const API_BASE_URL = 'https://api.pioneersx.store/api';

const API = {
    // ===================================
    // TOKEN MANAGEMENT
    // ===================================
    getToken() {
        return localStorage.getItem('token');
    },
    
    setToken(token) {
        localStorage.setItem('token', token);
    },
    
    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    // ===================================
    // USER MANAGEMENT
    // ===================================
    getUser() {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    },
    
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    isLoggedIn() {
        return !!this.getToken() && !!this.getUser();
    },
    
    // ===================================
    // API REQUEST HELPER
    // ===================================
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(url, {
                ...options,
                headers
            });
            
            const data = await response.json();
            
            // DIAGNOSTIC LOG: This shows you exactly why the server is angry
            if (!response.ok) {
                console.error(`🔴 API Error [${response.status}] at ${endpoint}:`, data);
            }
            
            if (response.status === 401) {
                // Only clear token if we aren't on the login page already
                if (!window.location.pathname.includes('index.html')) {
                    this.removeToken();
                    window.location.href = 'index.html';
                }
                return { success: false, message: data.message || 'Session expired' };
            }
            
            return {
                success: response.ok,
                data: data.data || data,
                message: data.message || (response.ok ? 'Success' : 'Request failed')
            };
        } catch (error) {
            console.error('🌐 Network/System Error:', error);
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        }
    },
    
    // ===================================
    // AUTHENTICATION
    // ===================================
    async register(userData) {
        // We explicitly map the data to ensure confirmPassword is included
        const result = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword // Critical fix for 400 error
            })
        });
        
        if (result.success && result.data) {
            const token = result.data.token || (result.data.tokens && result.data.tokens.accessToken);
            if (token) this.setToken(token);
            if (result.data.user) this.setUser(result.data.user);
        }
        
        return result;
    },
    
    async login(email, password) {
        const result = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (result.success && result.data) {
            const token = result.data.token || (result.data.tokens && result.data.tokens.accessToken);
            if (token) this.setToken(token);
            if (result.data.user) this.setUser(result.data.user);
        }
        
        return result;
    },
    
    logout() {
        this.removeToken();
    },
    
    async forgotPassword(email) {
        return await this.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    },
    
    async resetPassword(token, password) {
        return await this.request(`/auth/reset-password/${token}`, {
            method: 'PUT',
            body: JSON.stringify({ password })
        });
    },
    
    async verifyEmail(token) {
        return await this.request(`/auth/verify-email/${token}`, {
            method: 'GET'
        });
    },
    
    async getMe() {
        const result = await this.request('/auth/me', {
            method: 'GET'
        });
        
        if (result.success && result.data) {
            this.setUser(result.data);
        }
        
        return result;
    },
    
    // ===================================
    // USER ENDPOINTS
    // ===================================
    async updateProfile(profileData) {
        const result = await this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
        
        if (result.success && result.data) {
            this.setUser(result.data);
        }
        
        return result;
    },
    
    async changePassword(passwordData) {
        return await this.request('/users/change-password', {
            method: 'PUT',
            body: JSON.stringify(passwordData)
        });
    },
    
    // ===================================
    // PAYMENT ENDPOINTS
    // ===================================
    async createOrder(product, plan, billingCycle) {
        return await this.request('/payments/create-order', {
            method: 'POST',
            body: JSON.stringify({ product, plan, billingCycle })
        });
    },
    
    async captureOrder(orderId) {
        return await this.request('/payments/capture-order', {
            method: 'POST',
            body: JSON.stringify({ orderId })
        });
    },
    
    async getPaymentHistory() {
        return await this.request('/payments/history', {
            method: 'GET'
        });
    },
    
    // ===================================
    // SUBSCRIPTION ENDPOINTS
    // ===================================
    async getSubscriptionPlans() {
        return await this.request('/subscriptions/plans', {
            method: 'GET'
        });
    },
    
    async getMySubscriptions() {
        return await this.request('/subscriptions/my', {
            method: 'GET'
        });
    },
    
    async getSubscription(id) {
        return await this.request(`/subscriptions/${id}`, {
            method: 'GET'
        });
    },
    
    async cancelSubscription(id) {
        return await this.request(`/subscriptions/${id}/cancel`, {
            method: 'PUT'
        });
    },
    
    async reactivateSubscription(id) {
        return await this.request(`/subscriptions/${id}/reactivate`, {
            method: 'PUT'
        });
    }
};

window.API = API;
