import { createContext, useEffect, useState } from 'react';
import { getHistory, getUsers } from '../Networking/api';

export const SessionContext = createContext('');

function SessionContextProvider(props) {
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const addMessage = (message) => {
    messages.push(message);
    setMessages([...messages]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const requestUsers = async () => {
    setUsers([...(await getUsers())]);
  };

  const requestHistory = async () => {
    setMessages(await getHistory());
    console.log('Got history');
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
        clearMessages,
        requestHistory,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
