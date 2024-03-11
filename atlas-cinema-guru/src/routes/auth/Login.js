import './auth.css';
import Button from '../../components/general/Button';
import Input from '../../components/general/Input';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

const Login = ({ username, password, setUsername, setPassword }) => {

  return (
    <div className="login">
      <p>Sign in with your account</p>
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
        icon={faKey}
      />
      <Button
        label="Sign In"
        type="submit"
        className="login-button"
        icon={faKey}
      />
    </div>
  )
}

export default Login;
