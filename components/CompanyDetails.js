import React from 'react';
import './CompanyDetails.css';

const CompanyDetails = () => {
  return (
    <div className="company-details">
      <h2>Company Information</h2>
      <div className="address-card">
        <h3>Our Headquarters</h3>
        <p>123 Tech Park Avenue</p>
        <p>Silicon Valley, CA 94025</p>
        <p>United States</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Email: info@resumescreening.com</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
