import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';
import heroBackgroundImage from '../styles/Police_Dashboard.avif'; 
const PoliceDashboard = () => {
  const { user } = useAuth();
  const [touristData, setTouristData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // Load tourist data and alerts
    const applications = JSON.parse(localStorage.getItem('touristApplications') || '[]');
    setTouristData(applications);
    
    // Simulate heatmap data
    setHeatmapData(generateHeatmapData());
  }, []);

  const generateHeatmapData = () => {
    // Simulate tourist cluster data
    return [
      { location: "City Center", intensity: 85, riskLevel: "high" },
      { location: "Beach Area", intensity: 92, riskLevel: "high" },
      { location: "Market Place", intensity: 78, riskLevel: "medium" },
      { location: "Hotel District", intensity: 65, riskLevel: "medium" }
    ];
  };

  const generateEFIR = (touristId) => {
    const tourist = touristData.find(t => t.id === touristId);
    const eFIR = {
      id: `EFIR-${Date.now()}`,
      touristId,
      touristName: `${tourist.firstName} ${tourist.lastName}`,
      generatedBy: user.name,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    const existingEFIRs = JSON.parse(localStorage.getItem('eFIRs') || '[]');
    localStorage.setItem('eFIRs', JSON.stringify([...existingEFIRs, eFIR]));
    alert('E-FIR generated successfully');
  };

  return (
    <div className="dashboard-container">
      <h1>Police Dashboard</h1>
      <div className="hero-background-image">
          <img 
            src={heroBackgroundImage} 
            alt="Digital tourism safety concept with QR code and landmarks" 
          />
        </div>
      {/* Real-time Heatmap Section */}
      <div className="dashboard-section">
        <h2>Tourist Heat Map & High-Risk Zones</h2>
        <div className="heatmap-grid">
          {heatmapData.map((area, index) => (
            <div key={index} className={`heatmap-card ${area.riskLevel}`}>
              <h3>{area.location}</h3>
              <p>Intensity: {area.intensity}%</p>
              <p>Risk Level: {area.riskLevel.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tourist Records Section */}
      <div className="dashboard-section">
        <h2>Digital ID Records</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Passport</th>
                <th>Status</th>
                <th>Last Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {touristData.map(tourist => (
                <tr key={tourist.id}>
                  <td>{tourist.id}</td>
                  <td>{tourist.firstName} {tourist.lastName}</td>
                  <td>{tourist.passportNumber}</td>
                  <td>
                    <span className={`status-badge status-${tourist.status}`}>
                      {tourist.status}
                    </span>
                  </td>
                  <td>City Center (2 hours ago)</td>
                  <td>
                    <button 
                      onClick={() => generateEFIR(tourist.id)}
                      className="btn-alert"
                    >
                      Generate E-FIR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert History */}
      <div className="dashboard-section">
        <h2>Alert History</h2>
        <div className="alerts-list">
          {alerts.length === 0 ? (
            <p>No recent alerts</p>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <span className="alert-type">{alert.type}</span>
                <span>{alert.message}</span>
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;