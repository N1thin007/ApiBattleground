import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle the email check
    alert(`Checking email: ${email}`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Check if someone’s compromised an online account linked to your email</h1>
        <p>
          Do more to find out if your online accounts are at risk with our data leak checker —
          secure your online accounts by changing your passwords.
        </p>
      </header>

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="dashboard-input"
          placeholder="Enter your email address"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="dashboard-button">
          Check Now
        </button>
      </form>

      <footer className="dashboard-footer">
        <label className="dashboard-checkbox">
          <input type="checkbox" />
          Receive news and product updates
        </label>

        <ul className="dashboard-info">
          <li>Get a private and secure report sent to your email.</li>
          <li>See if your LinkedIn, Facebook, Twitter, email, or others have been compromised.</li>
          <li>So far, we’ve detected 4,196,958,468 stolen passwords.</li>
        </ul>
      </footer>
    </div>
  );
};

export default Dashboard;