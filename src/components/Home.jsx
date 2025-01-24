// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList'; 

const Home = () => {
  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-3xl">Welcome to Our E-Commerce Store!</h1>
        <nav>
          <ul className="flex space-x-4 mt-4">
            <li>
              <Link to="/" className="text-white">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="text-white">Cart</Link>
            </li>
            <li>
              <Link to="/login" className="text-white">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-white">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto mt-6">
        <h2 className="text-xl font-bold">Featured Products</h2>
        <ProductList /> 
      </main>
    </div>
  );
};

export default Home;
