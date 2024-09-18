import React, { useState } from 'react';
import axios from 'axios';

const EmailChecker = () => {
  const [email, setEmail] = useState('');
  const [breachData, setBreachData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const fetchBreachData = async () => {
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://api.xposedornot.com/v1/check-email/${email}`);
      setBreachData(response.data);
    } catch (err) {
      setError('An error occurred while fetching the data.');
    }

    setLoading(false);
  };

  const renderTable = (data) => {
    if (!data || !data.breaches) {
      return <p>No breach data available.</p>;
    }

    const breaches = data.breaches[0] || [];

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Breaches</th>
          </tr>
        </thead>
        <tbody>
          {breaches.map((breach, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{breach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.container}>
      <h1>Email Breach Checker</h1>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={handleInputChange}
        style={styles.input}
      />
      <button onClick={fetchBreachData} style={styles.button} disabled={loading}>
        {loading ? 'Fetching Data...' : 'Check Breaches'}
      </button>
      
      {error && <p style={styles.error}>{error}</p>}

      {breachData && (
        <div style={styles.sectionContent}>
          {renderTable(breachData)}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f4f7f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    width: '80%',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#e74c3c',
    marginTop: '10px',
    fontWeight: '500',
  },
  table: {
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  th: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '12px 15px',
    borderBottom: '2px solid #ddd',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '14px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  tr: {
    transition: 'background-color 0.2s ease',
  },
  trHover: {
    backgroundColor: '#f5f9fc',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px',
    wordBreak: 'break-all',
  },
};

export default EmailChecker;