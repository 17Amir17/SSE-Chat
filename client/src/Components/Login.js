import { useRef } from 'react';
import '../styles/login.css';

function Login(props) {
  const loginInput = useRef(null);
  const loginClick = (e) => {
    const loginName = loginInput.current.value;
    console.log(loginName);
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

export default Login;
