import { createContext, useEffect, useState } from 'react';
import { getHistory, getUsers } from '../Networking/api';

export const SessionContext = createContext('');

function SessionContextProvider(props) {
  const [username, setUsername] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const setInitial = (username, accessToken, refreshToken) => {
    setUsername(username);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const clearSession = () => {
    setUsername(undefined);
    setAccessToken(undefined);
    setRefreshToken(undefined);
  };

  const addMessage = (message) => {
    messages.push(message);
    setMessages([...messages]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const requestUsers = async () => {
    setUsers([...(await getUsers(accessToken))]);
  };

  const requestHistory = async (token) => {
    setMessages(await getHistory(token));
    console.log('Got history');
  };

  return (
    <SessionContext.Provider
      value={{
        username,
        setInitial,
        messages,
        setMessages,
        addMessage,
        users,
        requestUsers,
        clearMessages,
        requestHistory,
        accessToken,
        refreshToken,
        clearSession,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
