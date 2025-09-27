import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'hotel',
    organization: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(formData);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        <h2>Register for TripChain</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
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
          <div className="auth-form-group">
            <label>Role/Department</label>
            <select 
              value={formData.role} 
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="hotel">Hotel Staff</option>
              <option value="airport">Airport Staff</option>
              <option value="checkpost">Checkpost Staff</option>
              <option value="police">Police Department</option>
              <option value="tourism">Tourism Department</option>
            </select>
          </div>
          <div className="auth-form-group">
            <label>Organization Name</label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({...formData, organization: e.target.value})}
              required
            />
          </div>
          <div className="auth-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          {error && <div className="auth-error-message">{error}</div>}
          <button type="submit" className="auth-btn-primary">Register</button>
        </form>
        <p className="auth-form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;