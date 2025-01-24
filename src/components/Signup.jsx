import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/users/signup', {
       name,
        email,
        password,
      });

      if (response.data.token) {
        alert('User registered successfully!');
        localStorage.setItem('userToken', response.data.token);
        navigate('/login');
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);  
      } else {
        setErrorMessage('Error during sign-up. Please try again.');
      }
      console.error('Error during sign-up:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp}>
      <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
