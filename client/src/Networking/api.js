import axios from 'axios';

const BASE_URL = 'http://localHost:8080';
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

export async function getStream(user, cb = () => {}) {
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
    console.log(message);
    cb(message);
  };

  source.addEventListener('message', (message) => {
    console.log('Message!\n', message);
    cb(message);
  });

  source.onerror = (error) => {
    console.log('Error\n', error);
    source.close();
  };

  return () => {
    source.close();
  };
}
