import { TypingUser } from '../services/types';

const timeForTyping = 10000; //Miliseconds
const currentlyTyping: TypingUser = {};

export function userIsTyping(name: string, cb: () => void) {
  currentlyTyping[name] = new Date().getTime();
  setTimeout(() => {
    //Check if still typing in x seconds
    checkIfTyping(name, cb);
  }, timeForTyping);
}

function checkIfTyping(name: string, cb: () => void) {
  const timePassed = new Date().getTime() - currentlyTyping[name];
  if (timePassed > timeForTyping) {
    delete currentlyTyping[name];
    cb();
  }
}

export function getTypingList(): string[] {
  return Object.keys(currentlyTyping);
}
