import React, { useState } from 'react';
import '../styles/Touristform.css';

const TouristForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    idType: 'passport',
    idNumber: '',
    nationality: '',
    dateOfBirth: '',
    arrivalDate: '',
    departureDate: '',
    purposeOfVisit: 'tourism',
    accommodation: 'no',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
  });

  const [errors, setErrors] = useState({});

  const idTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'voter', label: 'Voter ID Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'driving', label: 'Driving Licence' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Validate departure date when arrival date changes
    if (name === 'arrivalDate' && formData.departureDate) {
      if (new Date(value) >= new Date(formData.departureDate)) {
        setErrors({
          ...errors,
          departureDate: 'Departure date must be after arrival date'
        });
      } else {
        setErrors({
          ...errors,
          departureDate: ''
        });
      }
    }

    // Validate departure date when it changes
    if (name === 'departureDate' && formData.arrivalDate) {
      if (new Date(value) <= new Date(formData.arrivalDate)) {
        setErrors({
          ...errors,
          departureDate: 'Departure date must be after arrival date'
        });
      } else {
        setErrors({
          ...errors,
          departureDate: ''
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.arrivalDate && formData.departureDate) {
      if (new Date(formData.departureDate) <= new Date(formData.arrivalDate)) {
        newErrors.departureDate = 'Departure date must be after arrival date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const touristId = `DTID${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
    
    const submissionData = {
      ...formData,
      id: touristId,
      issueDate: new Date().toISOString(),
      status: 'pending',
      blockchainHash: generateBlockchainHash(touristId)
    };
    
    onSubmit(submissionData);
  };

  const generateBlockchainHash = (id) => {
    return `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
  };

  const getIDPlaceholder = () => {
    switch (formData.idType) {
      case 'passport': return 'Enter Passport Number (e.g., A1234567)';
      case 'aadhaar': return 'Enter 12-digit Aadhaar Number';
      case 'voter': return 'Enter Voter ID Number';
      case 'pan': return 'Enter PAN Card Number (e.g., ABCDE1234F)';
      case 'driving': return 'Enter Driving Licence Number';
      default: return 'Enter ID Number';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tourist-form">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your middle name (optional)"
          />
        </div>
        
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        
        <div class="id-details-group">

        <div className="form-group">
          <label>ID Type *</label>
          <select 
            name="idType" 
            value={formData.idType} 
            onChange={handleChange}
            required
          >
            {idTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>ID Number *</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder={getIDPlaceholder()}
            required
          />
        </div>
        </div>
        
        <div className="form-group">
          <label>Nationality *</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Enter your nationality"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <h3>Trip Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Arrival Date *</label>
          <input
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Departure Date *</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
            required
          />
          {errors.departureDate && (
            <span className="error-message">{errors.departureDate}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Purpose of Visit</label>
          <select name="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange}>
            <option value="tourism">Tourism</option>
            <option value="business">Business</option>
            <option value="medical">Medical</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Accommodation *</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="accommodation"
                value="yes"
                checked={formData.accommodation === 'yes'}
                onChange={handleChange}
                required
              />
              <span>Yes</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="accommodation"
                value="no"
                checked={formData.accommodation === 'no'}
                onChange={handleChange}
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      <h3>Emergency Contact</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Contact Name</label>
          <input
            type="text"
            name="emergencyName"
            value={formData.emergencyName}
            onChange={handleChange}
            placeholder="Emergency contact person name"
          />
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            placeholder="Emergency contact phone number"
          />
        </div>
        
        <div className="form-group">
          <label>Relationship</label>
          <input
            type="text"
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            placeholder="Relationship with emergency contact"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">Generate Digital ID</button>
    </form>
  );
};

export default TouristForm;