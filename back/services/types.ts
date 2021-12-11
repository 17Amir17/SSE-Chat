import { Request, Response } from 'express';

export interface ErrorCodes {
  [key: string]: ErrorCode;
}
export interface ErrorCode {
  message: string;
  code: number;
}
export interface RegistrationParams {
  username: string;
  password: string;
}
export interface LoginParams extends RegistrationParams {}
export interface Data {
  date?: string;
  username?: string;
  message?: string;
  time?: Date;
}
export interface TypingData extends Data {
  typing: string[];
}
export interface ConnectionList {
  [key: string]: Connection;
}
export interface Connection {
  name: string;
  stream: Response;
}
export interface User {
  username: string;
  password: string;
}
export interface NonSensativeUser {
  username: string;
}
export interface TypingUser {
  [key: string]: number;
}
export interface UserEvent {
  username: string;
}
export interface UserConnectionEvent extends UserEvent {}
export interface UserSendMessageEvent extends UserEvent {
  message: string;
}
export interface UserTypingEvent extends UserEvent {}
export interface ValidTokens {
  [key: string]: string;
}
export type ModifiedRequest = Request & { username?: string };
export type UserRequest = Required<ModifiedRequest>;
export type JWTPayload = string | Buffer | object;

export enum ChatEvent {
  ChatMessage = 'CHAT_MESSAGE',
  UserJoined = 'USER_JOINED',
  UserLeft = 'USER_LEFT',
  UserTyping = 'USER_TYPING',
}
