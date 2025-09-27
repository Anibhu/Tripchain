import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      switch(result.user.role) {
        case 'police':
          navigate('/police-dashboard');
          break;
        case 'tourism':
          navigate('/tourism-dashboard');
          break;
        case 'hotel':
        case 'airport':
        case 'checkpost':
          navigate('/verifier-dashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        <h2>Login to TripChain</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="auth-form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {error && <div className="auth-error-message">{error}</div>}
          <button type="submit" className="auth-btn-primary">Login</button>
        </form>
        <p className="auth-form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;