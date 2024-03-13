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
  const [error, setError] = useState("");

  const handleSubmit = async (onSubmit) => {
    onSubmit.preventDefault();

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return; // Stop the function if validation fails
    }

    const endpoint = _switch ? 'http://localhost:8000/api/auth/login' : 'http://localhost:8000/api/auth/register';
    console.log({ username, password });

    try {
      const response = await axios.post(endpoint, { username, password });

      const { accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken); // Store the token
        console.log(typeof setUserUsername);
        setUserUsername(username); // Update username
        setIsLoggedIn(true);
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message
                      ? error.response.data.message
                      : error.message;
      setError(errorMessage); // Update the error state with the new message
      console.error('Authentication error:', errorMessage);
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
      {error && <div className="error-message">{error}</div>}
    </form>
  )
}

export default Authentication;
