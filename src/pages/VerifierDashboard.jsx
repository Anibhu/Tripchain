import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';
import heroBackgroundImage from '../styles/Verifier_Dashboard.avif'; 
const VerifierDashboard = () => {
  const { user } = useAuth();
  const [qrData, setQrData] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const verifyQRCode = () => {
    const applications = JSON.parse(localStorage.getItem('touristApplications') || '[]');
    const tourist = applications.find(app => app.id === qrData);
    
    if (tourist && tourist.status === 'approved') {
      setVerificationResult({
        valid: true,
        tourist: tourist,
        message: 'ID Verified Successfully'
      });
      
      const verificationLog = {
        id: Date.now().toString(),
        touristId: tourist.id,
        verifiedBy: user.organization,
        timestamp: new Date().toISOString(),
        location: user.role
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('verificationLogs') || '[]');
      localStorage.setItem('verificationLogs', JSON.stringify([...existingLogs, verificationLog]));
    } else {
      setVerificationResult({
        valid: false,
        message: 'Invalid or Expired ID'
      });
    }
  };

  return (
    <div className="dashboard-page-container">
      <h1 className="dashboard-title">{user.organization} - Verification Portal</h1>
      <div className="hero-background-image">
          <img 
            src={heroBackgroundImage} 
            alt="Digital tourism safety concept with QR code and landmarks" 
          />
        </div>
      <div className="dashboard-section">
        <h2>Verify Tourist ID</h2>
        <div className="verification-input-group">
          <input
            type="text"
            placeholder="Scan or Enter QR Code"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            className="verification-input"
          />
          <button onClick={verifyQRCode} className="dashboard-btn-primary">
            Verify ID
          </button>
        </div>
        
        {verificationResult && (
          <div className={`verification-result ${verificationResult.valid ? 'verification-valid' : 'verification-invalid'}`}>
            <h3>{verificationResult.message}</h3>
            {verificationResult.valid && (
              <div className="verification-tourist-info">
                <p><strong>Name:</strong> {verificationResult.tourist.firstName} {verificationResult.tourist.lastName}</p>
                <p><strong>Passport:</strong> {verificationResult.tourist.passportNumber}</p>
                <p><strong>Nationality:</strong> {verificationResult.tourist.nationality}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifierDashboard;