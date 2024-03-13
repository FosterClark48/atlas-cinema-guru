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

  // function to open/close sidebar
  const toggleSidebar = () => {
    setSmall(!small); // This will toggle between true and false
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

  useEffect(() => {
    // Function to adjust the sidebar's top position based on the header's height
    const adjustSidebarTop = () => {
      const header = document.querySelector('.header-nav'); // Select the header element
      const sidebar = document.querySelector('.sidebar'); // Select the sidebar element
      if (header && sidebar) {
        const headerHeight = header.offsetHeight; // Get the height of the header
        sidebar.style.top = `${headerHeight}px`; // Set the sidebar's top position to match the header's height
      }
    };

    adjustSidebarTop(); // Call the function on component mount

    // Optional: If your header might change height dynamically (e.g., due to window resizing), consider adding an event listener
    window.addEventListener('resize', adjustSidebarTop);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', adjustSidebarTop);
    };
  }, []);

  return (
    <nav className={`sidebar ${small ? '' : 'open'}`} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
      <ul className="navigation-menu">
        <li className={`nav-item ${selected === 'home' ? 'selected' : ''}`} onClick={() => setPage('home')}>
          <FontAwesomeIcon className="fa-icon" icon={faHome} />
          {!small && <span>Home</span>}
        </li>
        <li className={`nav-item ${selected === 'favorites' ? 'selected' : ''}`} onClick={() => setPage('favorites')}>
          <FontAwesomeIcon className="fa-icon" icon={faStar} />
          {!small && <span>Favorites</span>}
        </li>
        <li className={`nav-item ${selected === 'watchlater' ? 'selected' : ''}`} onClick={() => setPage('watchlater')}>
          <FontAwesomeIcon className="fa-icon" icon={faClock} />
          {!small && <span>Watch Later</span>}
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
