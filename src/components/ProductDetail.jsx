import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/api';
import { useCart } from '../context/CartContext'; // Import the useCart hook

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Get the addToCart function from the context
  const [product, setProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    console.log('Button clicked'); 
    if (isAdding) return; // Prevent further clicks if already adding
  
    setIsAdding(true); // Disable button temporarily
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);
    
    // Re-enable the button after a small delay (e.g., 500ms)
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <img src={product.image} alt={product.name} className="w-full h-auto my-4" />
      <p>{product.description}</p>
      <p className="font-semibold mt-4">Price: ₹{product.price}</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
        onClick={handleAddToCart} 
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;

