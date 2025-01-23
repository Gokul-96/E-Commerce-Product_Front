
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
});

// Global Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

let authToken = localStorage.getItem('token'); // Store token in memory

// Set Auth Token (used during login)
const setAuthToken = (token) => {
  authToken = token;
  localStorage.setItem('token', token);
};

// Get Auth Header for Authorization
const getAuthHeader = () => {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
};

// API Calls
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    const { token } = response.data;
    setAuthToken(token);  // Store token after login
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const response = await api.get('/orders', { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export default api;
