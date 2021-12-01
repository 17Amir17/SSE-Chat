import { createContext, useState } from 'react';

export const SessionContext = createContext('');

function SessionContextProvider(props) {
  const [username, setUsername] = useState();
  const [message, setMessages] = useState([]);
  return (
    <SessionContext.Provider
      value={{ username, setUsername, message, setMessages }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
