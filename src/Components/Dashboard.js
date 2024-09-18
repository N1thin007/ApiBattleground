import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Modal from './Modal';
import AllBreachModal from './AllBreachModal';
import EmailChecker from './EmailChecker';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [messageColor, setMessageColor] = useState(''); // State for message color
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isAllBreachModalOpen, setIsAllBreachModalOpen] = useState(false); // State for all breach modal visibility

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        setMessage('No Breaches Found');
        setMessageColor('green');
        return;
      }

      const data = await response.json();
      
      if (data.breaches && data.breaches.length > 0) {
        setMessage('Your email has been breached.');
        setMessageColor('red'); // Set message color to red
      } else {
        setMessage('No breaches found for this email.');
        setMessageColor('green'); // Set message color to green
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openAllBreachModal = () => setIsAllBreachModalOpen(true);
  const closeAllBreachModal = () => setIsAllBreachModalOpen(false);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="#" onClick={openModal}>Anonymous Password Check</Link></li>
            <li><Link to="/email-checker">All Breach Data</Link></li>
            <li><Link to="/domain-specific-breach">Domain-Specific Breach</Link></li>
            <li><Link to="/email-breach-analytics">Email Breach Analytics</Link></li>
          </ul>
        </nav>
        <h1 className="dashboard-title">Check if someone's compromised an online account linked to your email</h1>
        <p className="dashboard-description">
          Do more to find out if your online accounts are at risk with our data leak checker —
          secure your online accounts by changing your passwords.
        </p>
      </header>

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="dashboard-input-field"
          placeholder="Enter your email address"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="dashboard-submit-button">
          Check Now
        </button>
      </form>

      {/* Results Section */}
      {error && <p className="dashboard-error-message">Error: {error}</p>}
      {message && <p className="dashboard-result-message" style={{ color: messageColor }}>{message}</p>}

      {/* About Us Section */}
      <section className="dashboard-about-us">
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
        <div className="dashboard-footer-socials">
          <a href="https://facebook.com" className="dashboard-footer-social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://twitter.com" className="dashboard-footer-social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://linkedin.com" className="dashboard-footer-social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </div>
        <div className="dashboard-footer-info">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <AllBreachModal isOpen={isAllBreachModalOpen} onClose={closeAllBreachModal} />
    </div>
  );
};

export default Dashboard;