import axios from 'axios';

const BASE_URL = 'http://localHost:8080';
const CHAT_MESSAGE = 'CHAT_MESSAGE';
const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';
let source = [];

export async function login(name) {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      name,
    });
    return {
      status: true,
      message: response.data.message,
      name: response.data.name,
    };
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || 'something went wrong :(',
    };
  }
}

export async function sendMessage(username, message) {
  try {
    const response = await axios.post(
      `${BASE_URL}/message/send?user=${username}`,
      {
        message,
      }
    );
  } catch (error) {
    console.log(error.response);
  }
}

export async function getUsers() {
  try {
    const res = await axios.get(`${BASE_URL}/message/userList?user=admin`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getHistory() {
  try {
    const res = await axios.get(`${BASE_URL}/message/history?user=admin`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const throwaway = () => {};
export async function getStream(
  user,
  onMessage = throwaway,
  onJoin = throwaway,
  onLeave = throwaway,
  onError = throwaway
) {
  if (source[0]) {
    source[0].close();
  } //If stream is up close it
  source[0] = new EventSource(`${BASE_URL}/message/stream?user=${user}`);

  source[0].onopen = () => {
    console.log('EventStream opened');
  };

  source[0].addEventListener(USER_JOINED, (message) => {
    message = JSON.parse(message.data);
    onJoin(message.username, message.time);
  });

  source[0].addEventListener(USER_LEFT, (message) => {
    message = JSON.parse(message.data);
    console.log(`User ${message.username} left!`);
    onLeave(message.username, message.time);
  });

  source[0].addEventListener(CHAT_MESSAGE, (message) => {
    message = JSON.parse(message.data);
    onMessage(message.username, message.message, message.time);
  });

  source[0].onerror = (error) => {
    console.log('Error\n', error);
    source[0].close();
    onError();
  };

  return () => {
    source[0].close();
  };
}

export function closeStream() {
  console.log(source[0]);
  if (source[0]) {
    source[0].close();
    source[0] = undefined;
    console.log('Closed');
  }
}
