import './auth.css';
import Button from '../../components/general/Button';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (onSubmit) => {
    onSubmit.preventDefault();

    const endpoint = _switch ? 'http://localhost:8000/api/auth/login' : 'http://localhost:8000/api/auth/register';

    try {
      const response = await axios.post(endpoint, { username, password });

      const { accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken); // Store the token
        setUserUsername(username); // Update username
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form className="authentication" onSubmit={handleSubmit}>
      <div className="toggle-auth">
        <Button
          label="Sign In"
          type="button"
          className={_switch ? "light-red" : "dark-red"}
          onClick={() => set_switch(true)}
        />
        <Button
          label="Sign Up"
          type="button"
          className={_switch ? "dark-red" : "light-red"}
          onClick={() => set_switch(false)}
        />
      </div>
      {_switch ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <Register
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </form>
  )
}

export default Authentication;
