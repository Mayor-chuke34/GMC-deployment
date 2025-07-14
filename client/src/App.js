import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [dataStatus, setDataStatus] = useState('');

  useEffect(() => {
    // Fetch message from backend
    fetch('/api/message') // Uses proxy for local dev, direct path for deployed
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Error fetching message:", err));

    // Fetch data from backend (example)
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setDataStatus(data.message || data.status))
      .catch(err => console.error("Error fetching data:", err));

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN App Deployment Checkpoint</h1>
        <p>Backend Message: {message}</p>
        <p>Backend Data Status: {dataStatus}</p>
        <p>If you see these messages, your backend API is working!</p>
        <p>If you see "MongoDB Connected", your database is connected!</p>
      </header>
    </div>
  );
}

export default App;