import { createContext, useState } from 'react';

export const SessionContext = createContext('');

function SessionContextProvider(props) {
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    messages.push(message);
    setMessages([...messages]);
  };
  return (
    <SessionContext.Provider
      value={{ username, setUsername, messages, setMessages, addMessage }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
