import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-auto my-4" />
      <p>{product.description}</p>
      <p className="font-semibold mt-4">Price: ${product.price}</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
