import React, { useState, useEffect } from 'react';
import './navigation.css';
import axios from 'axios';
import Activity from '../Activity';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faClock } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  const [selected, setSelected] = useState("home");
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    navigate(`/${pageName}`);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/activity');
        setActivities(response.data.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch activites:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <nav className="sidebar">
      <ul className="navigation-menu">
        <li className={`nav-item ${selected === 'home' ? 'selected' : ''}`} onClick={() => setPage('home')}>
          <FontAwesomeIcon icon={faHome} /> Home
        </li>
        <li className={`nav-item ${selected === 'favorites' ? 'selected' : ''}`} onClick={() => setPage('favorites')}>
          <FontAwesomeIcon icon={faStar} /> Favorites
        </li>
        <li className={`nav-item ${selected === 'watchlater' ? 'selected' : ''}`} onClick={() => setPage('watchlater')}>
          <FontAwesomeIcon icon={faClock} /> Watch Later
        </li>
      </ul>
      {showActivities && (
        <ul className="activity-list">
          {activities.map((activity, index) => (
            <Activity key={index} userUsername={activity.userUsername} title={activity.title} date={activity.date} />
          ))}
        </ul>
      )}
    </nav>
  );
}

export default SideBar;
