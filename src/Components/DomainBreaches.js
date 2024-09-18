import React, { useState } from 'react';
import axios from 'axios';

const DomainBreachAnalytics = () => {
  const [email, setEmail] = useState(''); 
  const [breachData, setBreachData] = useState({});
  const [currentSection, setCurrentSection] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(false); 

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const fetchBreachData = async () => {
    if (!email) {
      setError('Please enter a valid domain.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(
        'https://api.xposedornot.com/v1/domain-breaches/',
        { domain: email },
        {
          headers: {
            'x-api-key': '0ef9f49ae62860584f8db06faf3f5bd5',
            'Content-Type': 'application/json',
          },
        }
      );

      setBreachData(response.data.metrics);
      setSuccess(true); 
    } catch (err) {
      setError('An error occurred while fetching the breach data.');
    }

    setLoading(false); 
  };

  const renderTable = (data) => {
    if (!data || Object.keys(data).length === 0) {
      return <p>No data available.</p>;
    }

    // If data is an object (not array), convert to an array of key-value pairs
    const tableData = Array.isArray(data)
      ? data
      : Object.entries(data).map(([key, value]) => ({ key, value }));

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            {Object.keys(tableData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'Breach_Summary':
        return renderTable(breachData.Breach_Summary || {});
      case 'Breaches_Details':
        return renderTable(breachData.Breaches_Details || []);
      case 'Detailed_Breach_Info':
        return renderTable(breachData.Detailed_Breach_Info || {});
      case 'Domain_Summary':
        return renderTable(breachData.Domain_Summary || {});
      case 'Top10_Breaches':
        return renderTable(breachData.Top10_Breaches || {});
      case 'Yearly_Metrics':
        return renderTable(breachData.Yearly_Metrics || {});
      default:
        return <p>Please select a section to view the details.</p>;
    }
  };

  return (
    <div style={styles.container}>
      <h1>Domain Breach Analytics</h1>
      <input
        type="email"
        placeholder="Enter your email (domain)"
        value={email}
        onChange={handleInputChange}
        style={styles.input}
        disabled={success}
      />
      <button onClick={fetchBreachData} style={styles.button} disabled={loading || success}>
        {loading ? 'Fetching Data...' : 'Fetch Breach Data'}
      </button>
      
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>Breach data successfully fetched!</p>}

      {success && (
        <div>
          <div style={styles.buttonsContainer}>
            <button
              onClick={() => setCurrentSection('Breach_Summary')}
              style={styles.sectionButton}
            >
              Breach Summary
            </button>
            <button
              onClick={() => setCurrentSection('Breaches_Details')}
              style={styles.sectionButton}
            >
              Breaches Details
            </button>
            <button
              onClick={() => setCurrentSection('Detailed_Breach_Info')}
              style={styles.sectionButton}
            >
              Detailed Breach Info
            </button>
            <button
              onClick={() => setCurrentSection('Domain_Summary')}
              style={styles.sectionButton}
            >
              Domain Summary
            </button>
            <button
              onClick={() => setCurrentSection('Top10_Breaches')}
              style={styles.sectionButton}
            >
              Top 10 Breaches
            </button>
            <button
              onClick={() => setCurrentSection('Yearly_Metrics')}
              style={styles.sectionButton}
            >
              Yearly Metrics
            </button>
          </div>
          <div style={styles.sectionContent}>
            {renderSection()}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
  },
  input: {
    padding: '12px',
    width: '100%',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#18bc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  sectionButton: {
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    transition: 'transform 0.3s',
    margin: '10px',
  },
  sectionButtonHover: {
    transform: 'scale(1.05)',
  },
  sectionContent: {
    marginTop: '20px',
    textAlign: 'left',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
};

export default DomainBreachAnalytics;