
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-product-back.onrender.com/api', 
});


export default axiosInstance ;
