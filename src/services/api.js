import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service object with all endpoints
const apiService = {
  // ========== Authentication APIs ==========
  auth: {
    signup: (signupData) => apiClient.post('/auth/signup', signupData),
  },

  // ========== Home/Dashboard APIs ==========
  home: {
    getDashboard: () => apiClient.get('/home/dashboard'),
  },

  // ========== Dashboard APIs (with date filters) ==========
  dashboard: {
    getSummary: (userId, from, to) => 
      apiClient.get('/dashboard/summary', { 
        params: { userId, from, to } 
      }),
    getTransactions: (userId, from, to) => 
      apiClient.get('/dashboard/transactions', { 
        params: { userId, from, to } 
      }),
  },

  // ========== Transaction APIs ==========
  transactions: {
    addTransaction: (transactionData) => 
      apiClient.post('/transactions/add', transactionData),
    getOverview: () => apiClient.get('/transactions/overview'),
  },

  // ========== Entry APIs (Alternative Transaction Management) ==========
  entries: {
    addEntry: (entryData) => apiClient.post('/entries', entryData),
    getEntries: (userId) => apiClient.get('/entries', { params: { userId } }),
  },

  // ========== Account APIs ==========
  accounts: {
    createAccount: (accountData) => apiClient.post('/accounts', accountData),
    getAllAccounts: () => apiClient.get('/accounts'),
  },

  // ========== Transfer APIs ==========
  transfers: {
    transferFunds: (transferData) => apiClient.post('/transfers', transferData),
  },

  // ========== Report APIs ==========
  reports: {
    getTransactions: () => apiClient.get('/reports/transactions'),
    getSummary: () => apiClient.get('/reports/summary'),
    downloadPdf: () => apiClient.get('/reports/download', { 
      responseType: 'blob' 
    }),
  },

  // ========== User Profile/Settings APIs ==========
  settings: {
    getProfile: (authUserId) => 
      apiClient.get('/settings/profile', { params: { authUserId } }),
    updateProfile: (authUserId, profileData) => 
      apiClient.put('/settings/profile', profileData, { 
        params: { authUserId } 
      }),
  },
};

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiService;
