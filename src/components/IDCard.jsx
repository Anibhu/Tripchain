// import React from 'react';
// import QRCodeGenerator from './QRCodeGenerator';

// const IDCard = ({ data }) => {
//   if (!data) return null;

//   const isExpired = new Date(data.departureDate) < new Date();
//   const statusColor = data.status === 'approved' ? '#27ae60' : 
//                      data.status === 'rejected' ? '#e74c3c' : 
//                      isExpired ? '#f39c12' : '#3498db';

//   return (
//     <div className="id-card">
//       <div className="id-card-header" style={{ borderBottomColor: statusColor }}>
//         <div>
//           <h3>Digital Tourist ID</h3>
//           <p className="id-number">{data.id}</p>
//         </div>
//         <span className="status-badge" style={{ backgroundColor: statusColor }}>
//           {isExpired ? 'EXPIRED' : data.status.toUpperCase()}
//         </span>
//       </div>
      
//       <div className="id-card-body">
//         <div className="id-section">
//           <h4>Personal Information</h4>
//           <div className="info-grid">
//             <span>Name:</span>
//             <strong>{data.firstName} {data.lastName}</strong>
            
//             <span>Passport:</span>
//             <strong>{data.passportNumber}</strong>
            
//             <span>Nationality:</span>
//             <strong>{data.nationality}</strong>
            
//             <span>Date of Birth:</span>
//             <strong>{new Date(data.dateOfBirth).toLocaleDateString()}</strong>
//           </div>
//         </div>
        
//         <div className="id-section">
//           <h4>Trip Details</h4>
//           <div className="info-grid">
//             <span>Arrival:</span>
//             <strong>{new Date(data.arrivalDate).toLocaleDateString()}</strong>
            
//             <span>Departure:</span>
//             <strong>{new Date(data.departureDate).toLocaleDateString()}</strong>
            
//             <span>Purpose:</span>
//             <strong>{data.purposeOfVisit}</strong>
            
//             <span>Accommodation:</span>
//             <strong>{data.accommodation}</strong>
//           </div>
//         </div>
        
//         <div className="id-section">
//           <h4>Emergency Contact</h4>
//           <div className="info-grid">
//             <span>Name:</span>
//             <strong>{data.emergencyName}</strong>
            
//             <span>Phone:</span>
//             <strong>{data.emergencyPhone}</strong>
            
//             <span>Relationship:</span>
//             <strong>{data.emergencyRelationship}</strong>
//           </div>
//         </div>
        
//         <div className="id-section qr-section">
//           <QRCodeGenerator data={data} size={120} />
//           <div className="blockchain-info">
//             <p><strong>Blockchain Hash:</strong></p>
//             <code className="hash">{data.blockchainHash}</code>
//             <p><small>Issued: {new Date(data.issueDate).toLocaleString()}</small></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IDCard;







import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const IDCard = ({ data }) => {
  if (!data) return null;

  const isExpired = new Date(data.departureDate) < new Date();
  const statusColor = data.status === 'approved' ? '#27ae60' : 
                     data.status === 'rejected' ? '#e74c3c' : 
                     isExpired ? '#f39c12' : '#3498db';

  const getIDTypeLabel = (type) => {
    const types = {
      passport: 'Passport',
      aadhaar: 'Aadhaar Card',
      voter: 'Voter ID',
      pan: 'PAN Card',
      driving: 'Driving Licence'
    };
    return types[type] || type;
  };

  const displayName = data.middleName 
    ? `${data.firstName} ${data.middleName} ${data.lastName}`
    : `${data.firstName} ${data.lastName}`;

  return (
    <div className="id-card">
      <div className="id-card-header" style={{ borderBottomColor: statusColor }}>
        <div>
          <h3>Digital Tourist ID</h3>
          <p className="id-number">{data.id}</p>
        </div>
        <span className="status-badge" style={{ backgroundColor: statusColor }}>
          {isExpired ? 'EXPIRED' : data.status.toUpperCase()}
        </span>
      </div>
      
      <div className="id-card-body">
        <div className="id-section">
          <h4>Personal Information</h4>
          <div className="info-grid">
            <span>Name:</span>
            <strong>{displayName}</strong>
            
            <span>ID Type:</span>
            <strong>{getIDTypeLabel(data.idType)}</strong>
            
            <span>ID Number:</span>
            <strong>{data.idNumber}</strong>
            
            <span>Nationality:</span>
            <strong>{data.nationality}</strong>
            
            <span>Date of Birth:</span>
            <strong>{new Date(data.dateOfBirth).toLocaleDateString()}</strong>
          </div>
        </div>
        
        <div className="id-section">
          <h4>Trip Details</h4>
          <div className="info-grid">
            <span>Arrival:</span>
            <strong>{new Date(data.arrivalDate).toLocaleDateString()}</strong>
            
            <span>Departure:</span>
            <strong>{new Date(data.departureDate).toLocaleDateString()}</strong>
            
            <span>Purpose:</span>
            <strong>{data.purposeOfVisit}</strong>
            
            <span>Accommodation:</span>
            <strong>{data.accommodation === 'yes' ? 'Booked' : 'Not Booked'}</strong>
          </div>
        </div>
        
        {(data.emergencyName || data.emergencyPhone) && (
          <div className="id-section">
            <h4>Emergency Contact</h4>
            <div className="info-grid">
              {data.emergencyName && (
                <>
                  <span>Name:</span>
                  <strong>{data.emergencyName}</strong>
                </>
              )}
              {data.emergencyPhone && (
                <>
                  <span>Phone:</span>
                  <strong>{data.emergencyPhone}</strong>
                </>
              )}
              {data.emergencyRelationship && (
                <>
                  <span>Relationship:</span>
                  <strong>{data.emergencyRelationship}</strong>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="id-section qr-section">
          <QRCodeGenerator data={data} size={120} />
          <div className="blockchain-info">
            <p><strong>Blockchain Hash:</strong></p>
            <code className="hash">{data.blockchainHash}</code>
            <p><small>Issued: {new Date(data.issueDate).toLocaleString()}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;