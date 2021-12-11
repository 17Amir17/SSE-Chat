import { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../Context/SessionContext';
import { getStream, sendMessage, sendTyping } from '../Networking/api';
import { Form, Button, Card } from 'react-bootstrap';
import '../styles/chat.css';

function Chat(props) {
  const nav = useNavigate();
  const context = useContext(SessionContext);
  const messageInput = useRef(null);
  const [typing, setTyping] = useState([]);
  let lastTyped = new Date().getTime();

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

  const onTyping = (typing) => {
    setTyping(typing);
  };

  const onError = () => {
    nav('/');
  };

  useEffect(() => {
    getStream(context.username, onMessage, onJoin, onLeave, onTyping, onError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = () => {
    sendMessage(context.username, messageInput.current.value);
    messageInput.current.value = '';
  };

  const onChange = () => {
    const now = new Date().getTime();
    if (now - lastTyped > 500) {
      sendTyping(context.username);
      lastTyped = now;
    }
  };

  return (
    <div className={'chat'}>
      <Card body style={{ textAlign: 'left', marginBottom: '0.5em' }}>
        Logged in as{' '}
        <span style={{ fontWeight: 'bold' }}>{context.username}</span>
      </Card>
      <div className={'content'}>
        <div className={'message-area'}>
          <div className={'history-wrapper'}>
            <div className={'history'}>
              {context.messages.map((message, key) => {
                return (
                  <Card className={'msg'} key={key}>
                    <Card.Body>
                      <span className="msg-sender">{message.username}:</span>
                      <span className={'msg-body'}> {message.message}</span>
                      <span className={'time'}>
                        {new Date(message.time).toLocaleTimeString()}{' '}
                      </span>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
            <span>
              {typing.length === 0
                ? ''
                : 'Currently Typing: ' + typing.map((user) => `${user} `)}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Control
              as="textarea"
              placeholder="Write your message here"
              style={{ height: '100px' }}
              className={'messagebox'}
              ref={messageInput}
              onChange={onChange}
            />
            <Button className={'send'} onClick={send}>
              Send!
            </Button>
          </div>
        </div>
        <ul className={'online list-group'}>
          <span className={'online-label'}>Online</span>
          {context.users.map((user, i) => {
            return (
              <li className={'list-group-item'} key={i}>
                {user.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
