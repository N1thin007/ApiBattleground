import React, { useState } from 'react';
import axios from 'axios';
import { keccak_256 } from 'js-sha3'; // Ensure you have this library installed
import './Modal.css'; // Import CSS for styling

const Modal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const checkPassword = async () => {
    if (!password) {
      setResult('Oops! Try again with a valid password.');
      return;
    }

    setLoading(true);

    try {
      const pwdHash = keccak_256(password); // Hash the password
      const encodedPwdHash = encodeURIComponent(pwdHash);
      const url = `https://passwords.xposedornot.com/api/v1/pass/anon/${encodedPwdHash}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setResult('Password has been breached.');
      } else if (response.status === 404) {
        setResult('Password is safe');
      }
    } catch (err) {
      if (!err.response || err.response.status !== 404) {
        setResult(`Error: ${err.message}`);
      } else if (err.response.status === 404) {
        setResult('Password is safe');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
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
    </div>
  );
};

export default Modal;