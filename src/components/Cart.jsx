// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleRemoveFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.price}</p>
            <button onClick={() => handleRemoveFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
