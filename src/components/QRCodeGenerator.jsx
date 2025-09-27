import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ data, size = 128 }) => {
  if (!data) return null;

  const qrData = JSON.stringify({
    id: data.id,
    name: `${data.firstName} ${data.lastName}`,
    passport: data.passportNumber,
    validity: data.departureDate,
    status: data.status
  });

  return (
    <div className="qr-code-container">
      <div className="qr-code">
        <QRCodeCanvas 
          value={qrData} 
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      <p className="qr-label">Scan to verify</p>
    </div>
  );
};

export default QRCodeGenerator;