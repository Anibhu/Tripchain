import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';
import heroBackgroundImage from '../styles/Tourism_Dashboard.jpg'; 
const TourismDashboard = () => {
  const [stats, setStats] = useState({});
  const [regionalData, setRegionalData] = useState([]);

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('touristApplications') || '[]');
    const total = applications.length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const byNationality = calculateByNationality(applications);
    
    setStats({ total, approved });
    setRegionalData(byNationality);
  }, []);

  const calculateByNationality = (apps) => {
    const nationalityCount = {};
    apps.forEach(app => {
      nationalityCount[app.nationality] = (nationalityCount[app.nationality] || 0) + 1;
    });
    return Object.entries(nationalityCount).map(([country, count]) => ({
      country,
      count,
      percentage: ((count / apps.length) * 100).toFixed(1)
    }));
  };

  return (
    <div className="dashboard-page-container">
      <h1 className="dashboard-title">Tourism Department Dashboard
        
      </h1>
      {/* <h1 className="dashboard-title"></h1> */}
      <div className="hero-background-image">
          <img 
            src={heroBackgroundImage} 
            alt="Digital tourism safety concept with QR code and landmarks" 
          />
        </div>
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <h3>Total Tourist IDs</h3>
          <p className="dashboard-stat-number">{stats.total}</p>
        </div>
        <div className="dashboard-stat-card">
          <h3>Active IDs</h3>
          <p className="dashboard-stat-number">{stats.approved}</p>
        </div>
        <div className="dashboard-stat-card">
          <h3>Countries Represented</h3>
          <p className="dashboard-stat-number">{regionalData.length}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Tourist Distribution by Nationality</h2>
        <div className="nationality-chart">
          {regionalData.map(item => (
            <div key={item.country} className="nationality-item">
              <span className="nationality-country">{item.country}</span>
              <div className="nationality-bar-container">
                <div 
                  className="nationality-bar" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="nationality-count">{item.count} ({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourismDashboard;