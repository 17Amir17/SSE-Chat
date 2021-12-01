import axios from 'axios';

let source;

export async function login(name) {
  try {
    const response = await axios.post('/login/', {
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

export async function getStream(user) {
  if (source) source.close(); //If stream is up close it
  return new EventSource(`/message/stream?user=${user}`);
}
