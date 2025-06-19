
// API utility functions for Lead Referral System

const API_BASE_URL = 'https://api.yourcompany.com'; // Replace with actual API URL

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle FormData (for file uploads)
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      
      // Handle authentication errors
      if (response.status === 401) {
        this.removeToken();
        window.location.href = '/login.html';
        return;
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(fullName, email, employeeId, password) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        fullName,
        email,
        employeeId,
        password,
      }),
    });
  }

  // Dashboard endpoints
  async getDashboard() {
    return this.request('/api/leads/dashboard');
  }

  async getLeaderboard() {
    return this.request('/api/leaderboard/');
  }

  // Lead submission
  async submitLead(formData) {
    return this.request('/api/leads/', {
      method: 'POST',
      body: formData,
    });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Auth helper functions
function checkAuth() {
  const token = apiClient.getToken();
  if (!token) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

function logout() {
  apiClient.removeToken();
  window.location.href = '/login.html';
}

// Export for use in other files
window.apiClient = apiClient;
window.checkAuth = checkAuth;
window.logout = logout;
