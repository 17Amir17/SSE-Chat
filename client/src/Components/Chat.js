import { useContext, useRef, useEffect } from 'react';
import { SessionContext } from '../Context/SessionContext';
import { getStream, sendMessage } from '../Networking/api';
import '../styles/chat.css';

function Chat(props) {
  const context = useContext(SessionContext);
  const messageInput = useRef(null);

  const onMessage = (message) => {
    console.log(message);
  };
  useEffect(() => {
    getStream(context.username, onMessage);
  }, []);

  const send = () => {
    sendMessage(context.username, messageInput.current.value);
  };

  return (
    <div className={'chat'}>
      <span style={{ textAlign: 'left', marginBottom: '0.5em' }}>
        Logged in as {context.username}
      </span>
      <div className={'content'}>
        <div className={'message-area'}>
          <textarea className={'history'} readOnly={true}></textarea>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <textarea className={'messagebox'} ref={messageInput}></textarea>
            <button className={'send'} onClick={send}>
              Send!
            </button>
          </div>
        </div>
        <ul className={'online'}></ul>
      </div>
    </div>
  );
}

export default Chat;
