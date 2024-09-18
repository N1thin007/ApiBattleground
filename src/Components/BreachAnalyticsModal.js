import React, { useState } from 'react';
import axios from 'axios';

const BreachAnalyticsModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [breachData, setBreachData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const checkBreach = async () => {
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.xposedornot.com/v1/breach-analytics?email=${encodeURIComponent(email)}`
      );
      setBreachData(response.data);
    } catch (err) {
      setError('An error occurred while fetching the data.');
      setBreachData(null);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <h1>Email Breach Checker</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={checkBreach} style={styles.button}>
          {loading ? 'Checking...' : 'Check Breach'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        {breachData && (
          <div style={styles.resultContainer}>
            <h3>Breaches Summary</h3>
            <p>Domain: {breachData.BreachesSummary.domain || 'N/A'}</p>
            <p>Site: {breachData.BreachesSummary.site || 'N/A'}</p>
            <p>Timestamp: {breachData.BreachesSummary.tmpstmp || 'N/A'}</p>

            <h3>Pastes Summary</h3>
            <p>Count: {breachData.PastesSummary.cnt}</p>
            <p>Domain: {breachData.PastesSummary.domain || 'N/A'}</p>
            <p>Timestamp: {breachData.PastesSummary.tmpstmp || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '80%',
    maxWidth: '500px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
  },
  input: {
    padding: '10px',
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#18bc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  resultContainer: {
    marginTop: '20px',
    textAlign: 'left',
  },
};

export default BreachAnalyticsModal;