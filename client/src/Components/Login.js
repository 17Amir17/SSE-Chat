import { useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeStream, login } from '../Networking/api';
import Swal from 'sweetalert2';
import '../styles/login.css';
import { SessionContext } from '../Context/SessionContext';

function Login(props) {
  const loginInput = useRef(null);
  const context = useContext(SessionContext);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('LOCATION LOCATION');
    context.setUsername('');
    closeStream();
  }, [location]);

  const loginClick = async (e) => {
    const loginName = loginInput.current.value;
    const { status, message, name } = await login(loginName);
    status ? fireSuccess(message) : fireError(message);
    if (status) {
      context.setUsername(name);
      nav('/chat');
    }
  };

  return (
    <div className={'login'}>
      <span className={'login-elm'}>Enter Login:</span>
      <input
        type="text"
        className={'name-input login-elm'}
        placeholder={'Enter Login Name'}
        ref={loginInput}
      ></input>
      <div className={'btn-container login-elm'}>
        <button id={'login-btn'} onClick={loginClick}>
          Login
        </button>
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
