import React from 'react';
import Header from '../navigation/Header';
import './dashboard.css';

function Dashboard({ userUsername, setIsLoggedIn }) {

  return (
    <div className="dashboard">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default Dashboard;
