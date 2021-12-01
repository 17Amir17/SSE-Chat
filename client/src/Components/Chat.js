import { useContext, useRef, useEffect, useState } from 'react';
import { SessionContext } from '../Context/SessionContext';
import { getStream, sendMessage } from '../Networking/api';
import '../styles/chat.css';

function Chat(props) {
  const context = useContext(SessionContext);
  const messageInput = useRef(null);

  const onMessage = (username, message) => {
    context.addMessage({ username, message });
  };

  const onLeave = (username) => {
    context.addMessage({ username: 'Server', message: `${username} left` });
    context.requestUsers();
  };

  const onJoin = (username) => {
    context.addMessage({ username: 'Server', message: `${username} joined` });
    context.requestUsers();
  };

  useEffect(() => {
    getStream(context.username, onMessage, onJoin, onLeave);
  }, []);

  const send = () => {
    sendMessage(context.username, messageInput.current.value);
  };
  console.log(context.users);
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
                <p className="msg-sender" key={key}>
                  {message.username}:
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
