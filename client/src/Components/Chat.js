import '../styles/chat.css';

function Chat(props) {
  return (
    <div className={'chat'}>
      <div className={'message-area'}>
        <textarea className={'history'} readOnly={true}></textarea>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <textarea className={'messagebox'}></textarea>
          <button className={'send'}>Send!</button>
        </div>
      </div>
      <ul className={'online'}></ul>
    </div>
  );
}

export default Chat;
