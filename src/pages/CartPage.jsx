// src/pages/CartPage.jsx
import React, { useEffect, useRef } from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  const topRef = useRef();

  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div>
      <div ref={topRef}></div>
      <h1>Your Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
