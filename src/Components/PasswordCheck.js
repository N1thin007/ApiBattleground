import React, { useState } from 'react';
import axios from 'axios';
import './PasswordCheck.css'; // Import CSS for styling

const PasswordCheck = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const keccakHash = (pwd) => {
    // Placeholder function for hashing
    // Replace with actual Keccak hashing implementation
    // You might use a library like 'js-sha3'
    return ''; // Return hashed value
  };

  const checkPassword = async () => {
    if (!password) {
      setResult('Oops! Try again with a valid password.');
      return;
    }

    setLoading(true);

    try {
      const pwdHash = keccakHash(password);
      const encodedPwdHash = encodeURIComponent(pwdHash);
      const url = `https://passwords.xposedornot.com/api/v1/pass/anon/${encodedPwdHash}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setResult(response.data);
      } else if (response.status === 404) {
        setResult('Password is safe');
      }
    } catch (err) {
      // Only handle network errors or unexpected errors
      if (!err.response || err.response.status !== 404) {
        setResult(`Error: ${err.message}`);
    }
      else if(err.response.status === 404){
          setResult('Password is safe');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Password Check</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="password-input"
      />
      <button onClick={checkPassword} className="check-button" disabled={loading}>
        {loading ? 'Checking...' : 'Check Password'}
      </button>
      {result && <p className="result-message">{result}</p>}
    </div>
  );
};

export default PasswordCheck;