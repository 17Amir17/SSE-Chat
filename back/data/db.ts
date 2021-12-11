import { encrypt } from '../auth_tools/auth_tools';
import errorCodes from '../middleware/errorHandler/errorCodes';
import {
  Data,
  NonSensativeUser,
  RegistrationParams,
  User,
} from '../services/types';

export const users: User[] = [];
let onlineUsers: NonSensativeUser[] = [];
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

export const userOnline = (username: string) => {
  const user = onlineUsers.find((user) => {
    return user.username === username;
  });
  return !!user;
};

export const removeUser = (username: string) => {
  onlineUsers = onlineUsers.filter((user) => user.username !== username);
};

export const getUser = (username: string): User => {
  const user: User | undefined = users.find(
    (user) => user.username === username
  );
  if (!user) throw errorCodes.userNotFound;
  return user;
};

export const getUsersArr = () => {
  return onlineUsers;
};
