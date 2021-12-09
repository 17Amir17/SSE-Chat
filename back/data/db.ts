import errorCodes from '../middleware/errorHandler/errorCodes';
import { Data, User } from '../services/types';

let users: User[] = [];
export const chatHistory: Data[] = [];

export const userExistsByName = (username: string) => {
  const user = users.find((user) => {
    return user.name === username;
  });
  return !!user;
};

export const addUser = (username: string) => {
  if (userExistsByName(username)) throw errorCodes.userExists;
  users.push({ name: username });
};

export const removeUser = (username: string) => {
  users = users.filter((user) => user.name !== username);
};

export const getUsersArr = () => {
  return users;
};
