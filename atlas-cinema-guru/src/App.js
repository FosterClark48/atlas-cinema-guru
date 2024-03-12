import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (accessToken) {
      axios.post('http://localhost:8000/api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setUserUsername(response.data.username);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log('Authentication error:', error.response ? error.response.data : error);
        // localStorage.removeItem("accessToken");
        // setIsLoggedIn(false);
      })
    }
  }, []);

  return (
    <div className={`App ${isLoggedIn ? 'dashboard-view' : 'authentication-view'}`}>
      {isLoggedIn ? <Dashboard
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      /> : <Authentication
        setIsLoggedIn={setIsLoggedIn}
        setUserUsername={setUserUsername}
      />}
    </div>
  );
}

export default App;
