import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';

function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className='header-nav'>
      <p>Cinema Guru</p>
      <div className="user-options">
        <img src="https://picsum.photos/100/100" alt="User avatar" />
        <p>Welcome, {userUsername}</p>
        <span onClick={logout} className="logout-span">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </span>
      </div>
    </nav>
  );
}

export default Header;
