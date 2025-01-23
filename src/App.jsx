// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext'; 
import Login from './components/Login';
import Register from './components/Register';
const App = () => {
  return (
    <CartProvider>
         <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
      </AuthProvider>
    </CartProvider>
  );
};

export default App;
