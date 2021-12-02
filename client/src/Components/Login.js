import { useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeStream, login } from '../Networking/api';
import Swal from 'sweetalert2';
import '../styles/login.css';
import { SessionContext } from '../Context/SessionContext';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function Login(props) {
  const loginInput = useRef(null);
  const context = useContext(SessionContext);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    closeStream();
  }, [location]);

  const loginClick = async (e) => {
    const loginName = loginInput.current.value;
    const { status, message, name } = await login(loginName);
    status ? fireSuccess(message) : fireError(message);
    if (status) {
      context.setUsername(name);
      await context.requestHistory();
      nav('/chat');
    }
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
        <InputGroup.Text>Login Name:</InputGroup.Text>
        <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          ref={loginInput}
        />
      </InputGroup>
      <div className={'btn-container login-elm'}>
        <Button id={'login-btn'} size="lg" onClick={loginClick}>
          Login
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
