import { encrypt } from '../auth_tools/auth_tools';
import errorCodes from '../middleware/errorHandler/errorCodes';
import {
  Data,
  NonSensativeUsers,
  RegistrationParams,
  User,
} from '../services/types';

export const users: User[] = [];
let onlineUsers: NonSensativeUsers[] = [];
export const chatHistory: Data[] = [];

export const userExistsByName = (username: string) => {
  const user = users.find((user) => {
    return user.username === username;
  });
  return !!user;
};

export const addUser = (regParams: RegistrationParams) => {
  if (userExistsByName(regParams.username)) throw errorCodes.userExists;
  users.push({
    username: regParams.username,
    password: encrypt(regParams.password),
  });
};

export const removeUser = (username: string) => {
  onlineUsers = onlineUsers.filter((user) => user.username !== username);
};

export const getUsersArr = () => {
  return onlineUsers;
};
