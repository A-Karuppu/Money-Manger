import axios from "axios";

// ✅ Base URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// ✅ Axios Instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ API SERVICES
const apiService = {

  // ---------- AUTH ----------
  auth: {
    signup: (data) => apiClient.post("/auth/signup", data),
    signin: (data) => apiClient.post("/auth/signin", data),
  },

  // ---------- HOME ----------
  home: {
    getDashboard: () => apiClient.get("/home/dashboard"),
  },

  // ---------- DASHBOARD ----------
  dashboard: {
    getSummary: (userId, from, to) =>
      apiClient.get("/dashboard/summary", {
        params: { userId, from, to },
      }),

    getTransactions: (userId, from, to) =>
      apiClient.get("/dashboard/transactions", {
        params: { userId, from, to },
      }),
  },

  // ---------- TRANSACTIONS ----------
  transactions: {
    addTransaction: (data) =>
      apiClient.post("/transactions", data),

    getOverview: () =>
      apiClient.get("/transactions"),
  },

  // ---------- ACCOUNTS ----------
  accounts: {
    createAccount: (data) =>
      apiClient.post("/accounts", data),

    getAllAccounts: () =>
      apiClient.get("/accounts"),
  },

  // ---------- TRANSFERS ----------
  transfers: {
    transferFunds: (data) =>
      apiClient.post("/transfers", data),
  },

  // ---------- REPORTS ----------
  reports: {
    getTransactions: () =>
      apiClient.get("/reports/transactions"),

    getSummary: () =>
      apiClient.get("/reports/summary"),

    downloadPdf: () =>
      apiClient.get("/reports/download", {
        responseType: "blob",
      }),
  },

  // ---------- SETTINGS ----------
  settings: {
    getProfile: (authUserId) =>
      apiClient.get("/settings/profile", {
        params: { authUserId },
      }),

    updateProfile: (authUserId, profileData) =>
      apiClient.put("/settings/profile", profileData, {
        params: { authUserId },
      }),
  },

};

// ✅ Global Error Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiService;

