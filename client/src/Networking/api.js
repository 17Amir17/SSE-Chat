import axios from 'axios';

export async function login(username) {
  axios.post('locahost:3000/login', {
    username,
  });
}
