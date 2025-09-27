import React, { useState } from 'react';
import { getApplicationById } from '../utils/storage';
import IDCard from './IDCard';

const StatusCheck = () => {
  const [searchId, setSearchId] = useState('');
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');

  const handleCheckStatus = () => {
    setError('');
    setApplication(null);

    if (!searchId.trim()) {
      setError('Please enter a Digital Tourist ID');
      return;
    }

    const foundApplication = getApplicationById(searchId);
    
    if (foundApplication) {
      setApplication(foundApplication);
    } else {
      setError('No application found with this ID. Please check the ID and try again.');
    }
  };

  const getStatusMessage = (status, departureDate) => {
    const isExpired = new Date(departureDate) < new Date();
    
    switch (status) {
      case 'approved':
        return isExpired ? 'Your ID has expired' : 'Your ID is approved and active';
      case 'pending':
        return 'Your application is under review';
      case 'rejected':
        return 'Your application has been rejected';
      default:
        return 'Status unknown';
    }
  };

  const getStatusColor = (status, departureDate) => {
    const isExpired = new Date(departureDate) < new Date();
    
    if (isExpired) return '#f39c12';
    if (status === 'approved') return '#27ae60';
    if (status === 'pending') return '#3498db';
    if (status === 'rejected') return '#e74c3c';
    return '#95a5a6';
  };

  return (
    <div className="status-check-container">
      <div className="status-search">
        <h3>Check Your Application Status</h3>
        <p>Enter your Digital Tourist ID to check the current status of your application</p>
        
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter your Digital Tourist ID (e.g., DTID...)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="status-input"
          />
          <button onClick={handleCheckStatus} className="check-status-btn">
            Check Status
          </button>
        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
      </div>

      {application && (
        <div className="status-result">
          <div 
            className="status-header"
            style={{ borderLeftColor: getStatusColor(application.status, application.departureDate) }}
          >
            <div className="status-info">
              <h4>Application Status</h4>
              <p className="status-message">
                {getStatusMessage(application.status, application.departureDate)}
              </p>
            </div>
            <div 
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(application.status, application.departureDate) }}
            >
              {application.status.toUpperCase()}
              {new Date(application.departureDate) < new Date() && ' - EXPIRED'}
            </div>
          </div>

          <div className="status-details">
            <div className="detail-cards">
              <div className="detail-card">
                <h5>Application Details</h5>
                <div className="detail-item">
                  <span>Applied On:</span>
                  <strong>{new Date(application.issueDate).toLocaleDateString()}</strong>
                </div>
                <div className="detail-item">
                  <span>Last Updated:</span>
                  <strong>{application.updateDate ? 
                    new Date(application.updateDate).toLocaleDateString() : 
                    new Date(application.issueDate).toLocaleDateString()}
                  </strong>
                </div>
                <div className="detail-item">
                  <span>Validity:</span>
                  <strong>
                    {new Date(application.arrivalDate).toLocaleDateString()} - {new Date(application.departureDate).toLocaleDateString()}
                  </strong>
                </div>
              </div>

              <div className="detail-card">
                <h5>Applicant Information</h5>
                <div className="detail-item">
                  <span>Name:</span>
                  <strong>{application.firstName} {application.lastName}</strong>
                </div>
                <div className="detail-item">
                  <span>Passport:</span>
                  <strong>{application.passportNumber}</strong>
                </div>
                <div className="detail-item">
                  <span>Nationality:</span>
                  <strong>{application.nationality}</strong>
                </div>
              </div>

              <div className="detail-card">
                <h5>Blockchain Verification</h5>
                <div className="detail-item">
                  <span>Transaction Hash:</span>
                  <code className="blockchain-hash">{application.blockchainHash}</code>
                </div>
                <div className="detail-item">
                  <span>Verified:</span>
                  <strong>{application.status === 'approved' ? 'Yes' : 'No'}</strong>
                </div>
              </div>
            </div>

            {/* Show full ID card for approved applications */}
            {application.status === 'approved' && new Date(application.departureDate) > new Date() && (
              <div className="id-card-preview">
                <h5>Your Digital Tourist ID</h5>
                <IDCard data={application} />
              </div>
            )}

            {/* Status-specific messages */}
            <div className="status-guidance">
              {application.status === 'pending' && (
                <div className="guidance-message info">
                  <h6>What's Next?</h6>
                  <p>Your application is being reviewed by our team. This usually takes 24-48 hours.</p>
                  <ul>
                    <li>You'll receive an email notification when your status changes</li>
                    <li>Ensure all your documents are valid and clearly visible</li>
                    <li>Contact support if you need to update any information</li>
                  </ul>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="guidance-message warning">
                  <h6>Application Rejected</h6>
                  <p>Your application has been rejected. Possible reasons include:</p>
                  <ul>
                    <li>Invalid or expired documents</li>
                    <li>Incomplete information</li>
                    <li>Security concerns</li>
                  </ul>
                  <p>Please contact support for more details or to reapply.</p>
                </div>
              )}

              {new Date(application.departureDate) < new Date() && (
                <div className="guidance-message expired">
                  <h6>ID Expired</h6>
                  <p>Your Digital Tourist ID has expired. If you're still traveling, you'll need to apply for an extension or a new ID.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCheck;