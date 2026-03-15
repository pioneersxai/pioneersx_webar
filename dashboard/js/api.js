const API_BASE_URL = 'https://api.pioneersx.store/api';

const API = {
    getToken: () => localStorage.getItem('token'),
    setToken: (t) => localStorage.setItem('token', t),
    setUser: (u) => localStorage.setItem('user', JSON.stringify(u)),
    removeToken: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    isLoggedIn: () => !!localStorage.getItem('token'),
    
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        const token = this.getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();
            
            if (!response.ok) {
                console.error(`🔴 API Error [${response.status}]:`, data);
            }
            
            return { 
                success: response.ok, 
                status: response.status, 
                data: data.data || data, 
                message: data.message 
            };
        } catch (error) {
            return { success: false, message: "Network Error" };
        }
    },
    
    async login(email, password) {
        this.removeToken();
        const result = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email: email.trim(), password: password })
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
            body: JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email.trim(),
                password: userData.password,
                confirmPassword: userData.confirmPassword
            })
        });
        
        if (result.success && result.data) {
            const token = result.data.token || (result.data.tokens && result.data.tokens.accessToken);
            if (token) this.setToken(token);
            if (result.data.user) this.setUser(result.data.user);
        }
        
        return result;
    },
    
    async forgotPassword(email) {
        return await this.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email: email.trim() })
        });
    },
    
    async resetPassword(token, password) {
        return await this.request(`/auth/reset-password/${token}`, {
            method: 'POST',
            body: JSON.stringify({ password: password })
        });
    },
    
    async logout() {
        await this.request('/auth/logout', { method: 'POST' });
        this.removeToken();
    },
    
    async getMySubscriptions() {
        return await this.request('/subscriptions/my-subscriptions');
    }
};

window.API = API;
