import React from 'react';
import './dashboard.css';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';

function Dashboard({ userUsername, setIsLoggedIn }) {

  return (
    <BrowserRouter>
      <div className="dashboard">
        <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
        <SideBar />
      </div>
    </BrowserRouter>
  );
}

export default Dashboard;
