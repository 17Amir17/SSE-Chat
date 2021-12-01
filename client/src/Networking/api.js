import axios from 'axios';

const BASE_URL = 'http://localHost:8080';
const CHAT_MESSAGE = 'CHAT_MESSAGE';
const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';
let source;

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
    console.log(response);
  } catch (error) {
    console.log(error.response);
  }
}

const throwaway = () => {};
export async function getStream(
  user,
  onMessage = throwaway,
  onJoin = throwaway,
  onLeave = throwaway
) {
  console.log('Running stream!');
  if (source) {
    console.log('Closing prev stream');
    source.close();
  } //If stream is up close it
  source = new EventSource(`${BASE_URL}/message/stream?user=${user}`);

  source.onopen = () => {
    console.log('EventStream opened');
  };

  source.onmessage = (message) => {
    console.log('MSG\n', message.data);
  };

  source.addEventListener(USER_JOINED, (message) => {
    message = JSON.parse(message.data);
    onJoin(message.username);
  });

  source.addEventListener(USER_LEFT, (message) => {
    message = JSON.parse(message.data);
    console.log(`User ${message.username} left!`);
    onLeave(message.username);
  });

  source.addEventListener(CHAT_MESSAGE, (message) => {
    message = JSON.parse(message.data);
    onMessage(message.username, message.message);
  });

  source.onerror = (error) => {
    console.log('Error\n', error);
    source.close();
  };

  return () => {
    source.close();
  };
}
