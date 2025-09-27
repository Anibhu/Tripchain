import React from 'react';
import Verification from '../components/Verification';

const Verify = () => {
  return (
    <div className="page-container">
      <h1>Verify Digital Tourist ID</h1>
      <p className="page-description">
        Verify the authenticity of a Digital Tourist ID by entering the ID number 
        or scanning the QR code. The system will check against our blockchain records.
      </p>
      
      <Verification />
    </div>
  );
};

export default Verify;