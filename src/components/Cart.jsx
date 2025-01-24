import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, getCartTotal, removeFromCart } = useCart();
  console.log('Cart:', cart);
  if (cart.length === 0) {
    return <div>Your cart is empty!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item._id} className="flex justify-between items-center my-4">
          <img src={item.image} alt={item.title} className="w-16 h-16" />
          <div>
            <p>{item.title}</p>
            <p>₹{item.price} x {item.quantity}</p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-600 text-white px-4 py-2 mt-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="font-semibold mt-4">Total: ₹{getCartTotal()}</div>
    </div>
  );
};

export default CartPage;
