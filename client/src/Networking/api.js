import axios from 'axios';

export async function login(name) {
  try {
    const response = await axios.post('/login/', {
      name,
    });
    return { status: true, message: response.data.message };
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || 'something went wrong :(',
    };
  }
}
