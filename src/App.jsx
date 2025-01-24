import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useAuth, AuthProvider } from './context/AuthContext';

// Lazy loaded components
const Home = React.lazy(() => import('./components/Home'));
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const Cart = React.lazy(() => import('./components/Cart'));
const Login = React.lazy(() => import('./components/Login'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const Header = React.lazy(() => import('./components/Header'));
const Profile = React.lazy(() => import('./components/Profile'));  // Import Profile component

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Any additional logic related to authentication
  }, [isAuthenticated]);

  return (
    <CartProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Header isAuthenticated={isAuthenticated()} onLogout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={
              isAuthenticated() ? (
                <Navigate to="/" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated() ? (
                <Navigate to="/" replace />
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="/logout"
            element={
              <div className="text-center mt-4">
                <button
                  onClick={logout}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Logout
                </button>
              </div>
            }
          />
          {/* Add Profile route here */}
          <Route
            path="/profile"
            element={
              isAuthenticated() ? (
                <Profile />  // Display Profile if authenticated
              ) : (
                <Navigate to="/login" replace />  // Redirect to login if not authenticated
              )
            }
          />
        </Routes>
      </Suspense>
    </CartProvider>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
