import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="auth-page-container">
      <div className="unauthorized-card">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p>Your role: <strong>{user?.role}</strong></p>
        <Link to="/" className="auth-btn-primary">Return to Home</Link>
      </div>
    </div>
  );
};

export default Unauthorized;