import './components.css';
import React from 'react';

function Activity({ userUsername, title, date }) {

  return (
    <li className="activity">
      <p>
        <span className="activity-red">{userUsername} </span>
        added
        <span className="activity-red"> {title} </span>
        to watch later -
        <span className="activity-italics"> {date}</span>
      </p>
    </li>
  );
}

export default Activity;
