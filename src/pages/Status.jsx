import React from 'react';
import StatusCheck from '../components/StatusCheck';

const Status = () => {
  return (
    <div className="page-container">
      <div className="status-page-header">
        <h1>Check Application Status</h1>
        <p className="page-description">
          Track the status of your Digital Tourist ID application. Enter your unique ID number 
          to view current status, verification details, and next steps.
        </p>
      </div>

      <div className="status-features">
        <div className="feature-highlights">
          <div className="feature-highlight">
            <div className="highlight-icon">⏱️</div>
            <div>
              <h4>Real-time Updates</h4>
              <p>Get instant status updates as your application progresses through verification</p>
            </div>
          </div>
          <div className="feature-highlight">
            <div className="highlight-icon">📧</div>
            <div>
              <h4>Email Notifications</h4>
              <p>Receive email alerts when your application status changes</p>
            </div>
          </div>
          <div className="feature-highlight">
            <div className="highlight-icon">🔍</div>
            <div>
              <h4>Detailed Tracking</h4>
              <p>View complete application history and verification timeline</p>
            </div>
          </div>
        </div>
      </div>

      <StatusCheck />

      <div className="status-help">
        <h3>Need Help?</h3>
        <div className="help-options">
          <div className="help-option">
            <h5>Can't Find Your ID?</h5>
            <p>Check your email for the confirmation message sent when you applied.</p>
          </div>
          <div className="help-option">
            <h5>Application Taking Too Long?</h5>
            <p>Standard processing is 24-48 hours. Contact support if it's been longer.</p>
          </div>
          <div className="help-option">
            <h5>Need to Update Information?</h5>
            <p>Contact our support team to make changes to your application.</p>
          </div>
        </div>
        
        <div className="support-contact">
          <p><strong>Support Email:</strong> support@touristid.gov</p>
          <p><strong>Support Phone:</strong> +1-800-TOURIST</p>
          <p><strong>Office Hours:</strong> Mon-Fri, 9AM-5PM</p>
        </div>
      </div>
    </div>
  );
};

export default Status;