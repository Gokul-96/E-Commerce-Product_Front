import React from 'react';
import ProductList from './ProductList';
import Header from './Header'; 

const Home = () => {
  return (
    <div>
      
      <main className="container mx-auto mt-6">
        <h1>Login Credential</h1>
        <p>Email: binu@gmail.com</p>
        <p>Password: binu123</p>
        <h2 className="text-xl font-bold">Featured Products</h2>
        <ProductList /> 
      </main>
    </div>
  );
};

export default Home;

