import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL } from './constants';

const CHAT_MESSAGE = 'CHAT_MESSAGE';
const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';
const USER_TYPING = 'USER_TYPING';
let source;

export async function sendMessage(message, accessToken) {
  try {
    await axios.post(
      `${BASE_URL}/message/send`,
      {
        message,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
  } catch (error) {
    console.log(error.response);
  }
}

export async function sendTyping(accessToken) {
  try {
    await axios.post(`${BASE_URL}/message/typing`, null, {
      headers: {
        Authorization: accessToken,
      },
    });
  } catch (error) {
    console.log(error.response);
  }
}

export async function getUsers(accessToken) {
  try {
    const res = await axios.get(`${BASE_URL}/message/userList`, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getHistory(accessToken) {
  try {
    const res = await axios.get(`${BASE_URL}/message/history`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const throwaway = () => {};
export async function getStream(
  accessToken,
  onMessage = throwaway,
  onJoin = throwaway,
  onLeave = throwaway,
  onTyping = throwaway,
  onError = throwaway
) {
  if (source) {
    source.close();
  } //If stream is up close it
  source = new EventSourcePolyfill(`${BASE_URL}/message/stream`, {
    headers: {
      Authorization: accessToken,
    },
  });

  source.onopen = () => {
    console.log('EventStream opened');
  };

  source.addEventListener(USER_JOINED, (message) => {
    message = JSON.parse(message.data);
    onJoin(message.username, message.time);
  });

  source.addEventListener(USER_LEFT, (message) => {
    message = JSON.parse(message.data);
    console.log(`User ${message.username} left!`);
    onLeave(message.username, message.time);
  });

  source.addEventListener(CHAT_MESSAGE, (message) => {
    message = JSON.parse(message.data);
    onMessage(message.username, message.message, message.time);
  });

  source.addEventListener(USER_TYPING, (message) => {
    const typing = JSON.parse(message.data).typing;
    onTyping(typing);
  });

  source.onerror = (error) => {
    console.log('Error\n', error);
    source.close();
    onError();
  };

  return () => {
    source.close();
  };
}

export function closeStream() {
  if (source) {
    source.close();
    source = undefined;
    console.log('Closed');
  }
}
