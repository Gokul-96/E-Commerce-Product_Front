// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our E-Commerce Store!!!</h1>
        <p>Find the best products at unbeatable prices!</p>
        <Link to="/products" className="home-shop-button">
          Start Shopping
        </Link>
      </header>
      <section className="home-features">
        <div className="feature">
          <h3>Wide Variety</h3>
          <p>Explore a vast collection of products tailored to your needs.</p>
        </div>
        <div className="feature">
          <h3>Secure Checkout</h3>
          <p>Your payments are safe with our secure system.</p>
        </div>
        <div className="feature">
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered to your doorstep quickly.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
