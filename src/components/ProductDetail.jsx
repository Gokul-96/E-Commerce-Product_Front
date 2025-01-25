import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axiosInstance from '../services/api';
import { useCart } from '../context/CartContext'; // Import the useCart hook

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const { cart, addToCart } = useCart(); // Get cart and addToCart from the context
  const [product, setProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(0); // Track the current quantity in the cart

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);

        // Check if the product is already in the cart and update its quantity
        const cartItem = cart.find((item) => item._id === id);
        setCurrentQuantity(cartItem ? cartItem.quantity : 0);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, cart]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    if (isAdding) return; // Prevent further clicks if already adding

    setIsAdding(true); // Disable button temporarily
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);

    // Redirect to the cart page after adding the product
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
      <p className="mt-2">
        In Cart: <span className="font-semibold">{currentQuantity}</span>
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
        onClick={handleAddToCart}
        disabled={isAdding} // Disable button when adding to cart
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductDetailPage;
