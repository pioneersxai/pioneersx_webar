/**
 * PIONEERSX API CLIENT - STABILIZED VERSION
 * Handles all backend communication with https://api.pioneersx.store/api
 * Updated: March 13, 2026
 */
const API_BASE_URL = 'https://api.pioneersx.store/api';

const API = {
    getToken: () => localStorage.getItem('token'),
    setToken: (t) => localStorage.setItem('token', t),
    setUser: (u) => localStorage.setItem('user', JSON.stringify(u)),
    isLoggedIn: () => !!localStorage.getItem('token'),

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        const token = this.getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // DEBUG: See what we are sending
        if (options.body) console.log(`🚀 SENDING TO ${endpoint}:`, JSON.parse(options.body));

        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();
            
            if (!response.ok) console.error(`🔴 SERVER REJECTED [${response.status}]:`, data);
            
            return { success: response.ok, data: data.data || data, message: data.message };
        } catch (error) {
            return { success: false, message: "Network Error" };
        }
    },

    async login(email, password) {
        // Explicitly defining the object to ensure no hidden props
        const payload = { email: email, password: password };
        const result = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (result.success && result.data) {
            const token = result.data.token || (result.data.tokens && result.data.tokens.accessToken);
            if (token) this.setToken(token);
            if (result.data.user) this.setUser(result.data.user);
        }
        return result;
    },

    async register(userData) {
        const result = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        if (result.success && result.data) {
            const token = result.data.token || (result.data.tokens && result.data.tokens.accessToken);
            if (token) this.setToken(token);
            if (result.data.user) this.setUser(result.data.user);
        }
        return result;
    }
};
window.API = API;
