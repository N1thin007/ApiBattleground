import React, { useState } from 'react';
import axios from 'axios';
import './AllBreachModal.css'; // Import CSS file for styling

const AllBreachModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkBreaches = async () => {
    setLoading(true);
    setError(null);
    setBreaches([]); // Clear previous breaches
    try {
      const response = await axios.get(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`);
      
      if (response.status === 200) {
        // Check if the response has breaches data
        setBreaches(response.data.breaches[0] || []);
      } else {
        setError('No breaches found or unexpected response format');
      }
    } catch (err) {
      setError('Failed to fetch breach data');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const renderTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (breaches.length === 0) {
      return <p>No breaches found for this email.</p>;
    }

    return (
      <table className="breach-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Breach Name</th>
          </tr>
        </thead>
        <tbody>
          {breaches.map((breach, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{breach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h1>Check Email Breaches</h1>
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="check-button" onClick={checkBreaches}>Check Breaches</button>
        {renderTable()}
      </div>
    </div>
  );
};

export default AllBreachModal;