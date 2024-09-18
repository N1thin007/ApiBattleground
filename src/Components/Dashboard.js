import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Checking email: ${email}`);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/anonymous-password-check">Anonymous Password Check</Link></li>
            <li><Link to="/all-breach-data">All Breach Data</Link></li>
            <li><Link to="/domain-specific-breach">Domain-Specific Breach</Link></li>
            <li><Link to="/email-breach-analytics">Email Breach Analytics</Link></li>
          </ul>
        </nav>
        <h1>Check if someone's compromised an online account linked to your email</h1>
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

      {/* About Us Section */}
      <section className="dashboard-about">
        <div className="dashboard-about-item">
          <h3>Anonymous Password Check</h3>
          <p>
            This feature allows you to check if your passwords have been exposed in any data breaches
            without revealing your email address. It ensures your privacy while monitoring potential
            threats to your online security.
          </p>
        </div>
        <div className="dashboard-about-item">
          <h3>All Breach Data</h3>
          <p>
            View a comprehensive list of all known breaches across various services and websites.
            This option provides an overview of which services have been compromised and what data
            might have been exposed.
          </p>
        </div>
        <div className="dashboard-about-item">
          <h3>Domain-Specific Breach</h3>
          <p>
            Check if any specific domain or website has experienced a data breach. This can help
            you identify if a particular service you use has been compromised and take appropriate
            actions.
          </p>
        </div>
        <div className="dashboard-about-item">
          <h3>Email Breach Analytics</h3>
          <p>
            Analyze if your email address has been part of any breaches. This feature gives insights
            into the security of your email accounts and helps you understand potential risks and
            necessary security measures.
          </p>
        </div>
        <div className="dashboard-about-item">
        <h3>Email Breach Check</h3>
          <p>
          Staying informed about breaches helps you prevent potential identity theft and other security issues. Our Email Breach Check provides you with the necessary insights to act quickly and safeguard your online accounts.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        {/* Social Links and Checkbox */}
      </footer>
    </div>
  );
};

export default Dashboard;