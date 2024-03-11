import React, { useState } from 'react';
import './auth.css';
import Button from '../../components/general/Button';
import Input from '../../components/general/Input';
import { faUser, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';

const Register = ({ username, password, setUsername, setPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="register">
      <p>Create a new account</p>
      <Input
        label="Username:"
        type="text"
        className="username"
        value={username}
        setValue={setUsername}
        icon={faUser}
      />
      <Input
        label="Password:"
        type="password"
        className="password"
        value={password}
        setValue={setPassword}
        icon={faLock}
        showPasswordToggle={true}
        isPasswordVisible={isPasswordVisible}
        togglePassword={togglePasswordVisibility}
      />
      <Button
        label="Sign Up"
        type="submit"
        className="register-button"
        icon={faPlus}
      />
    </div>
  )
}

export default Register;
