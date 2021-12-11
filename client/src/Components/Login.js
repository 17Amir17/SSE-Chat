import { useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeStream } from '../Networking/api';
import { login, register } from '../Networking/getAuth';
import Swal from 'sweetalert2';
import '../styles/login.css';
import { SessionContext } from '../Context/SessionContext';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function Login(props) {
  const loginInput = useRef(null);
  const passwordInput = useRef(null);
  const context = useContext(SessionContext);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    closeStream();
    context.clearSession();
  }, [location]);

  const loginClick = async (e) => {
    const loginName = loginInput.current.value;
    const password = passwordInput.current.value;
    const { status, message, username, accessToken, refreshToken } =
      await login(loginName, password);
    status ? fireSuccess(message) : fireError(message);
    if (status) {
      context.setInitial(username, accessToken, refreshToken);
      await context.requestHistory(accessToken);
      nav('/chat');
    }
  };

  const registerClick = async (e) => {
    const loginName = loginInput.current.value;
    const password = passwordInput.current.value;
    const { status, message } = await register(loginName, password);
    status ? fireSuccess(message) : fireError(message);
  };

  return (
    <div className={'login'}>
      <span className={'title card-title'}>Chat Room!</span>
      <InputGroup
        size="lg"
        id="inputGroup-sizing-sm"
        className={'mb-3 name-input login-elm'}
        placeholder={'Enter Login Name'}
      >
        <InputGroup.Text>Username:</InputGroup.Text>
        <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          ref={loginInput}
        />
      </InputGroup>
      <InputGroup
        size="lg"
        id="inputGroup-sizing-sm"
        className={'mb-3 name-input login-elm'}
        placeholder={'Enter Login Name'}
      >
        <InputGroup.Text>Password:</InputGroup.Text>
        <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          ref={passwordInput}
          type="password"
        />
      </InputGroup>
      <div className={'btn-container login-elm'}>
        <Button id={'login-btn'} size="lg" onClick={loginClick}>
          Login
        </Button>
        <Button id={'register-btn'} size="lg" onClick={registerClick}>
          Register
        </Button>
      </div>
    </div>
  );
}

function fireSuccess(message) {
  Swal.fire({
    icon: 'success',
    title: 'Hooray!',
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

function fireError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
}
export default Login;
