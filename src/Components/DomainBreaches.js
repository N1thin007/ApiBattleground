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

    const tableData = Array.isArray(data)
      ? data
      : Object.entries(data).map(([key, value]) => ({ key, value }));

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            {Object.keys(tableData[0]).map((key) => (
              <th key={key} style={styles.th}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} style={styles.tr}>
              {Object.values(row).map((value, i) => (
                <td key={i} style={styles.td}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
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
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: '#f4f7f9',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  input: {
    padding: '15px',
    width: '97%',
    marginBottom: '20px',
    fontSize: '18px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.05)',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    padding: '14px 28px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    backgroundColor: '#18bc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 6px 15px rgba(24, 188, 156, 0.2)',
  },
  error: {
    color: '#e74c3c',
    marginTop: '10px',
    fontWeight: '500',
    fontSize: '14px',
  },
  success: {
    color: '#2ecc71',
    marginTop: '10px',
    fontWeight: '500',
    fontSize: '14px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '30px',
    gap: '20px',
    flexWrap: 'wrap',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  sectionButton: {
    padding: '14px 30px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '40px',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    margin: '10px',
    boxShadow: '0 6px 12px rgba(52, 152, 219, 0.2)',
  },
  sectionContent: {
    marginTop: '25px',
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
  },
  table: {
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    marginTop: '30px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    overflow: 'hidden',
    tableLayout: 'fixed', // Prevents the table from expanding beyond its container
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
    textAlign: 'left',
    fontSize: '14px',
    color: '#555',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px', // Sets a max-width for table cells
    wordBreak: 'break-all', // Breaks words to prevent overflow
  },
};

export default DomainBreachAnalytics;