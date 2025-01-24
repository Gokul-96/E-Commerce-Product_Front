// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
const Home = React.lazy(() => import('./components/Home'));
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const Cart = React.lazy(() => import('./components/Cart'));
const Login = React.lazy(() => import('./components/Login'));
const SignUp = React.lazy(() => import('./components/SignUp'));

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp />} /> 
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
};

export default App;
