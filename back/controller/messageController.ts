import { getUsersArr } from '../data/db';
import {
  ChatEvent,
  UserConnectionEvent,
  UserSendMessageEvent,
  UserTypingEvent,
} from '../services/types';
import { broadcast, removeUserAndConnection } from './chatController';
import { userIsTyping } from './typingController';

export async function onConnect(event: UserConnectionEvent) {
  //Send hello
  broadcast({ username: event.username }, ChatEvent.UserJoined);
}

export async function onDisconnect(event: UserConnectionEvent) {
  const username = event.username;
  console.log(`${username} Connection closed`);
  try {
    removeUserAndConnection(username);
    console.log(getUsersArr());
    await broadcast({ username }, ChatEvent.UserLeft);
  } catch (error) {
    console.log(error);
  }
}

export async function onUserSendMessage(event: UserSendMessageEvent) {
  broadcast({ username: event.username, message: event.message });
}

export async function onUserTyping(event: UserTypingEvent) {
  userIsTyping(event.username);
}
