import axios from 'axios';
import { BASE_URL } from './constants';

const AUTH_URL = `${BASE_URL}/auth`;

export async function login(username, password) {
  try {
    const response = await axios.post(`${AUTH_URL}/login/`, {
      username,
      password,
    });
    return {
      status: true,
      message: response.data.message,
      username: response.data.username,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || 'something went wrong :(',
    };
  }
}

export async function register(username, password) {
  try {
    const response = await axios.post(`${AUTH_URL}/register/`, {
      username,
      password,
    });
    return {
      status: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || 'something went wrong :(',
    };
  }
}
