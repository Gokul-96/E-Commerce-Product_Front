// src/components/LoginPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef(null); 
  const navigate = useNavigate()
  useEffect(() => {
    emailRef.current.focus(); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/'); 
      }
    } catch (err) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error('Login failed', err);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
