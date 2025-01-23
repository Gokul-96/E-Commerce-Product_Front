// src/components/ProductCard.jsx
import React, { useCallback } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = useCallback(() => {
    dispatch({ type: 'ADD_TO_CART', product });
  }, [dispatch, product]);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

