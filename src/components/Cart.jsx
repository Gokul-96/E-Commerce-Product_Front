import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, getCartTotal, removeFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <p>Your cart is empty!</p>
        <button
          onClick={() => navigate('/')} // Redirect to the home or product list page
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg"
        >
          Add Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item._id} className="flex justify-between items-center my-4">
          {/* Product Image */}
          <img src={item.image} alt={item.title} className="w-16 h-16" />

          {/* Product Details */}
          <div>
            <p>{item.title}</p>
            <p>Price: ₹{item.price}</p>
            <div className="flex items-center mt-2">
              {/* Decrease Quantity Button */}
              <button
                onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-300 rounded-l-md"
              >
                -
              </button>

              {/* Quantity Display */}
              <span className="px-4 py-1 border">{item.quantity}</span>

              {/* Increase Quantity Button */}
              <button
                onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-600 text-white px-4 py-2 mt-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Cart Total */}
      <div className="font-semibold mt-4">Total: ₹{getCartTotal()}</div>

      {/* Add More Products Button */}
      <button
        onClick={() => navigate('/')} // Redirect to the home or product list page
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg"
      >
        Add More Products
      </button>
    </div>
  );
};

export default CartPage;
