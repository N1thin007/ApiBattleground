import React, { useState } from 'react';
import axios from 'axios';

const DomainBreaches = () => {
  const [email, setEmail] = useState('');
  const [breachData, setBreachData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const checkDomainBreaches = async () => {
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setBreachData(null);

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
      setBreachData(response.data);
    } catch (err) {
      setError('An error occurred while fetching the domain breach data.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Domain Breach Checker</h1>
      <input
        type="email"
        placeholder="Enter your email (domain)"
        value={email}
        onChange={handleInputChange}
        style={styles.input}
      />
      <button onClick={checkDomainBreaches} style={styles.button}>
        {loading ? 'Checking...' : 'Check Domain Breaches'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {breachData && (
        <div style={styles.resultContainer}>
          <h3>Domain Breach Data</h3>
          <pre style={styles.pre}>{JSON.stringify(breachData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Styling for the component
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
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
  pre: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};

export default DomainBreaches;