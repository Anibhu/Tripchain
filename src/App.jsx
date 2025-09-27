import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header.jsx';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import PoliceDashboard from './pages/PoliceDashboard';
import TourismDashboard from './pages/TourismDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import Unauthorized from './pages/Unauthorized';
import Apply from './pages/Apply';
import Verify from './pages/Verify';
import Status from './pages/Status';
import './styles/App.css';
import { useAuth } from './context/AuthContext';

function App() {
  const [touristData, setTouristData] = useState(null);
  const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/status" element={<Status />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected Routes with Role-based Access */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } />
                
                <Route path="/police-dashboard" element={
                  <ProtectedRoute allowedRoles={['police']}>
                    <PoliceDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/tourism-dashboard" element={
                  <ProtectedRoute allowedRoles={['tourism']}>
                    <TourismDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/verifier-dashboard" element={
                  <ProtectedRoute allowedRoles={['hotel', 'airport', 'checkpost']}>
                    <VerifierDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;