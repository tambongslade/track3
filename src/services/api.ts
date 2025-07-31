import axios from 'axios'


// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Types for API responses
export interface DashboardStats {
  totalRevenue: number
  orders: number
  customers: number
  products: number
  revenueChange: string
  ordersChange: string
  customersChange: string
  productsChange: string
}

export interface RevenueData {
  labels: string[]
  data: number[]
}

export interface CategorySales {
  category: string
  value: number
  percentage: number
}

export interface Activity {
  id: number
  action: string
  time: string
  icon: string
  user?: string
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
  lastLogin: string
}

export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  sales: number
  status: 'active' | 'inactive'
}

export interface Order {
  id: number
  customerName: string
  total: number
  status: 'completed' | 'processing' | 'shipped' | 'cancelled'
  createdAt: string
  items: number
}

export interface AnalyticsData {
  pageViews: number[]
  uniqueVisitors: number[]
  bounceRate: number
  conversionRate: number[]
  deviceUsage: { device: string; percentage: number }[]
}

// API Service Functions
export const apiService = {
  // Dashboard APIs
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  getRevenueData: async (period: string = '6m'): Promise<RevenueData> => {
    const response = await api.get(`/dashboard/revenue?period=${period}`)
    return response.data
  },

  getCategorySales: async (): Promise<CategorySales[]> => {
    const response = await api.get('/dashboard/category-sales')
    return response.data
  },

  getRecentActivity: async (limit: number = 10): Promise<Activity[]> => {
    const response = await api.get(`/dashboard/activity?limit=${limit}`)
    return response.data
  },

  // User APIs
  getUsers: async (page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> => {
    const response = await api.get(`/users?page=${page}&limit=${limit}`)
    return response.data
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  createUser: async (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> => {
    const response = await api.post('/users', userData)
    return response.data
  },

  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },

  getUserGrowthData: async (period: string = '6m'): Promise<{ newUsers: number[]; activeUsers: number[] }> => {
    const response = await api.get(`/users/growth?period=${period}`)
    return response.data
  },

  getUserDemographics: async (): Promise<{ ageGroup: string; count: number }[]> => {
    const response = await api.get('/users/demographics')
    return response.data
  },

  // Product APIs
  getProducts: async (page: number = 1, limit: number = 10): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get(`/products?page=${page}&limit=${limit}`)
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post('/products', productData)
    return response.data
  },

  updateProduct: async (id: number, productData: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`)
  },

  getProductSales: async (): Promise<{ category: string; sales: number }[]> => {
    const response = await api.get('/products/sales-by-category')
    return response.data
  },

  getInventoryLevels: async (): Promise<{ inStock: number[]; lowStock: number[] }> => {
    const response = await api.get('/products/inventory-levels')
    return response.data
  },

  // Order APIs
  getOrders: async (page: number = 1, limit: number = 10): Promise<{ orders: Order[]; total: number }> => {
    const response = await api.get(`/orders?page=${page}&limit=${limit}`)
    return response.data
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  updateOrderStatus: async (id: number, status: Order['status']): Promise<Order> => {
    const response = await api.put(`/orders/${id}/status`, { status })
    return response.data
  },

  getOrdersOverTime: async (period: string = '6m'): Promise<number[]> => {
    const response = await api.get(`/orders/timeline?period=${period}`)
    return response.data
  },

  getOrderStatusDistribution: async (): Promise<{ status: string; count: number }[]> => {
    const response = await api.get('/orders/status-distribution')
    return response.data
  },

  getDailyOrders: async (): Promise<number[]> => {
    const response = await api.get('/orders/daily')
    return response.data
  },

  // Analytics APIs
  getAnalyticsData: async (period: string = '7d'): Promise<AnalyticsData> => {
    const response = await api.get(`/analytics?period=${period}`)
    return response.data
  },

  getTrafficData: async (): Promise<{ pageViews: number[]; uniqueVisitors: number[] }> => {
    const response = await api.get('/analytics/traffic')
    return response.data
  },

  getConversionData: async (): Promise<number[]> => {
    const response = await api.get('/analytics/conversion')
    return response.data
  },

  getDeviceUsage: async (): Promise<{ device: string; percentage: number }[]> => {
    const response = await api.get('/analytics/devices')
    return response.data
  },

  // Settings APIs
  getSettings: async (): Promise<Record<string, any>> => {
    const response = await api.get('/settings')
    return response.data
  },

  updateSettings: async (settings: Record<string, any>): Promise<Record<string, any>> => {
    const response = await api.put('/settings', settings)
    return response.data
  },

  // Authentication APIs
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
    localStorage.removeItem('authToken')
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh')
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

export default api