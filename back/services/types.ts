import { Request, Response } from 'express';

export interface ErrorCodes {
  [key: string]: ErrorCode;
}

export interface ErrorCode {
  message: string;
  code: number;
}

export interface LoginParams {
  name: string;
}

export interface Data {
  date?: string;
  username?: string;
  message?: string;
  time?: Date;
}

export interface ConnectionList {
  [key: string]: Connection;
}

export interface Connection {
  name: string;
  stream: Response;
}

export interface User {
  name: string;
}

export interface UserConnectionEvent {
  username: string;
}

export interface UserSendMessageEvent {
  username: string;
  message: string;
}

export type ModifiedRequest = Request & { username?: string };

export type UserRequest = Required<ModifiedRequest>;

export enum ChatEvent {
  ChatMessage = 'CHAT_MESSAGE',
  UserJoined = 'USER_JOINED',
  UserLeft = 'USER_LEFT',
}
