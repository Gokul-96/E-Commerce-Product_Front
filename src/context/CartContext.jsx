import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log('Adding product to cart:', product);  // Log the product being added
    setCart((prevCart) => {
      console.log('Current Cart:', prevCart);  // Log the current state of the cart
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      console.log('Existing Product Index:', existingProductIndex);  // Log the index of the existing product
  
      if (existingProductIndex > -1) {
        // If product exists, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        console.log('Updated Cart (after increment):', updatedCart);  // Log the updated cart
        return updatedCart;
      } else {
        // If product doesn't exist, add it with quantity 1
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        console.log('New Cart (after addition):', newCart);  // Log the new cart
        return newCart;
      }
    });
  };
  
  
  

  // Remove a product from the cart by its ID
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Clear all products from the cart
  const clearCart = () => {
    setCart([]);
  };

  // Get the total price of the items in the cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
