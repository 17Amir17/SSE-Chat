import { useContext } from 'react';
import { SessionContext } from '../Context/SessionContext';
import '../styles/chat.css';

function Chat(props) {
  const context = useContext(SessionContext);
  return (
    <div className={'chat'}>
      <span style={{ textAlign: 'left', marginBottom: '0.5em' }}>
        Logged in as {context.username}
      </span>
      <div className={'content'}>
        <div className={'message-area'}>
          <textarea className={'history'} readOnly={true}></textarea>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <textarea className={'messagebox'}></textarea>
            <button className={'send'}>Send!</button>
          </div>
        </div>
        <ul className={'online'}></ul>
      </div>
    </div>
  );
}

export default Chat;
