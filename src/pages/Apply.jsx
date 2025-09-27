import React, { useState } from 'react';
import TouristForm from '../components/TouristForm';
import IDCard from '../components/IDCard';
import { saveApplication } from '../utils/storage';

const Apply = ({ setTouristData }) => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    const savedData = saveApplication(data);
    setSubmittedData(savedData);
    setTouristData(savedData);
  };

  return (
    <div className="page-container">
      <h1>Apply for Digital Tourist ID</h1>
      <p className="page-description">
        Complete the form below to generate your secure Digital Tourist ID. 
        This ID will be stored on our blockchain system for verification purposes.
      </p>
      
      {!submittedData ? (
        <TouristForm onSubmit={handleFormSubmit} />
      ) : (
        <div className="submission-success">
          <div className="success-header">
            <h2>✅ Application Submitted Successfully!</h2>
            <p>Your Digital Tourist ID has been generated and recorded on our blockchain.</p>
          </div>
          
          <IDCard data={submittedData} />
          
          <div className="action-buttons">
            <button onClick={() => window.print()} className="print-btn">
              🖨️ Print ID
            </button>
            <button onClick={() => setSubmittedData(null)} className="secondary-btn">
              📝 Apply for Another ID
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apply;