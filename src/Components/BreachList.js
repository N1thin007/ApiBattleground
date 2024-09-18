import React, { useState } from 'react';
import './BreachList.css'; // Import CSS file

const BreachList = () => {
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle the fetch request
  const fetchBreaches = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://xon-api-test.xposedornot.com/v1/breaches');
      if (!response.ok) {
        throw new Error('Failed to fetch breach data');
      }

      const data = await response.json();

      console.log('API Response:', data); // Log the response to see the structure

      // Set breaches if data is an array, otherwise set it as empty
      setBreaches(Array.isArray(data) ? data : []);
    } catch (err) {
      setBreaches([]); // Ensure breaches is set to an empty array if there is an error
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="breach-container">
       
      <h1 className="breach-title">Breach List</h1>
      <button className="generate-button" onClick={fetchBreaches} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {!loading && breaches.length > 0 && (
        <ul className="breach-list">
          {breaches.map((breach, index) => (
            <li key={index} className="breach-item">
              <h3>{breach.Name || 'No Name Available'}</h3>
              <p><strong>Date:</strong> {breach.Date || 'No Date Available'}</p>
              <p><strong>Description:</strong> {breach.Description || 'No Description Available'}</p>
              <p><strong>Domain:</strong> {breach.Domain || 'No Domain Available'}</p>
              <p><strong>Pwn Count:</strong> {breach.PwnCount || 'No Pwn Count Available'}</p>
              <p><strong>Data Classes:</strong> {breach.DataClasses ? breach.DataClasses.join(', ') : 'No Data Classes Available'}</p>
            </li>
          ))}
        </ul>
      )}

      {!loading && breaches.length === 0 && (
        <p className="no-breaches-message">No breaches found.</p>
      )}
    </div>
  );
};

export default BreachList;