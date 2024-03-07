import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToke");

    if (accessToken) {
      axios.post('http://localhost:8000/api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setIsLoggedIn(true);
        setUserUsername(response.data.user.username);
      })
      .catch(error => {
        console.log('Authentication error:', error);
      })
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      /> : <Authentication
        setIsLoggedIn={setIsLoggedIn}
        userUsername={userUsername}
      />}
    </div>
  );
}

export default App;
