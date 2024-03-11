import './auth.css';
import Button from '../../components/general/Button';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="authentication">
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