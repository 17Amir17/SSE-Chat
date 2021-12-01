import { useRef } from 'react';
import { login } from '../Networking/api';
import Swal from 'sweetalert2';
import '../styles/login.css';

function Login(props) {
  const loginInput = useRef(null);

  const loginClick = async (e) => {
    const loginName = loginInput.current.value;
    console.log(loginName);
    const { status, message } = await login(loginName);
    status ? fireSuccess(message) : fireError(message);
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
