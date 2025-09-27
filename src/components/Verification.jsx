import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Verification = () => {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleVerify = () => {
    const applications = JSON.parse(localStorage.getItem('touristApplications') || '[]');
    const result = applications.find(app => app.id === searchId);
    
    if (result) {
      const isExpired = new Date(result.departureDate) < new Date();
      setVerificationResult({
        valid: result.status === 'approved' && !isExpired,
        data: result,
        message: isExpired ? 'ID has expired' : 
                result.status === 'approved' ? 'Digital Tourist ID is valid' :
                result.status === 'pending' ? 'ID is pending approval' :
                'ID has been rejected'
      });
    } else {
      setVerificationResult({
        valid: false,
        message: 'ID not found in system'
      });
    }
  };

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setSearchId(parsedData.id);
        setShowScanner(false);
      } catch (error) {
        console.error('Invalid QR code data');
      }
    }
  };

  return (
    <div className="verification-container">
      <h2>Verify Digital Tourist ID</h2>
      
      <div className="verify-options">
        <button 
          className={`option-btn ${!showScanner ? 'active' : ''}`}
          onClick={() => setShowScanner(false)}
        >
          Manual Entry
        </button>
        <button 
          className={`option-btn ${showScanner ? 'active' : ''}`}
          onClick={() => setShowScanner(true)}
        >
          QR Scanner
        </button>
      </div>

      {!showScanner ? (
        <div className="manual-verify">
          <div className="verify-input">
            <input
              type="text"
              placeholder="Enter Digital Tourist ID (e.g., DTID...)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleVerify} className="verify-btn">Verify</button>
          </div>
        </div>
      ) : (
        <div className="qr-scanner">
          <div className="scanner-placeholder">
            <p>📱 Scanner Interface</p>
            <div className="scanner-frame">
              <QRCodeCanvas 
                value={JSON.stringify({ example: true, id: 'DTIDEXAMPLE123' })}
                size={200}
              />
              <p>Point camera at QR code</p>
            </div>
            <button onClick={() => handleScan('{"id":"DTIDEXAMPLE123"}')} className="simulate-scan">
              Simulate QR Scan
            </button>
          </div>
        </div>
      )}
      
      {/* ... rest of your component remains the same ... */}
    </div>
  );
};

export default Verification;