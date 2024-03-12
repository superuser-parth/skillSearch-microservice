import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?skills=${searchQuery}`);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by skills..."   
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>Search</button>

      <ul>
        {companies.map((company, index) => (
          <li key={index}>
            <h3>{company.companyName}</h3>
            <p>Position: {company.position}</p>
            <p>Skills: {company.skills.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
