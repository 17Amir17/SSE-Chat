import { createContext, useEffect, useState } from 'react';
import { getUsers } from '../Networking/api';

export const SessionContext = createContext('');

function SessionContextProvider(props) {
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const addMessage = (message) => {
    messages.push(message);
    setMessages([...messages]);
  };

  const requestUsers = async () => {
    setUsers([...(await getUsers())]);
  };

  return (
    <SessionContext.Provider
      value={{
        username,
        setUsername,
        messages,
        setMessages,
        addMessage,
        users,
        requestUsers,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
