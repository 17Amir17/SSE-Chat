import { useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../Context/SessionContext';
import { getStream, sendMessage } from '../Networking/api';
import '../styles/chat.css';

function Chat(props) {
  const nav = useNavigate();
  const context = useContext(SessionContext);
  const messageInput = useRef(null);

  const onMessage = (username, message, time) => {
    context.addMessage({ username, message, time });
  };

  const onLeave = (username, time) => {
    context.addMessage({
      username: 'Server',
      message: `${username} left`,
      time,
    });
    context.requestUsers();
  };

  const onJoin = (username, time) => {
    context.addMessage({
      username: 'Server',
      message: `${username} joined`,
      time,
    });
    context.requestUsers();
  };

  const onError = () => {
    nav('/');
  };

  useEffect(() => {
    getStream(context.username, onMessage, onJoin, onLeave, onError);
  }, []);

  const send = () => {
    sendMessage(context.username, messageInput.current.value);
    messageInput.current.value = '';
  };
  return (
    <div className={'chat'}>
      <span style={{ textAlign: 'left', marginBottom: '0.5em' }}>
        Logged in as {context.username}
      </span>
      <div className={'content'}>
        <div className={'message-area'}>
          <div className={'history'}>
            {context.messages.map((message, key) => {
              return (
                <p className={'msg'} key={key}>
                  <span className={'time'}>
                    {new Date(message.time).toLocaleTimeString()}{' '}
                  </span>
                  <span className="msg-sender">{message.username}:</span>
                  <span className={'msg-body'}> {message.message}</span>
                </p>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <textarea className={'messagebox'} ref={messageInput}></textarea>
            <button className={'send'} onClick={send}>
              Send!
            </button>
          </div>
        </div>
        <ul className={'online'}>
          {context.users.map((user, i) => {
            return <li key={i}>{user.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
