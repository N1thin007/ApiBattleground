import React, { useState } from 'react';
import './EmailBreach.css'; // Import CSS file

const EmailBreach = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkBreaches = async () => {
    try {
      const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch breach information');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderTable = () => {
    if (!result || !result.breaches || result.breaches[0].length === 0) {
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
          {result.breaches[0].map((breach, index) => (
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
    <div className="container">
      <h1>Email Breach Checker</h1>
      <input
        className="input-field"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="check-button" onClick={checkBreaches}>Check Breaches</button>

      {error && <p className="error-message">Error: {error}</p>}
      {result && (
        <div>
          <h2>Breach Summary</h2>
          {renderTable()}
        </div>
      )}
    </div>
  );
};

export default EmailBreach;