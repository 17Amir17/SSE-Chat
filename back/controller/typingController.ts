import { TypingUser } from '../services/types';

const timeForTyping = 2000; //Miliseconds
const currentlyTyping: TypingUser = {};

export function userIsTyping(name: string, cb: () => void) {
  currentlyTyping[name] = new Date().getTime();
  setTimeout(() => {
    //Check if still typing in x seconds
    checkIfTyping(name, cb);
  }, timeForTyping + 10); // The + 10 gives extra time for the later if statement
}

function checkIfTyping(name: string, cb: () => void) {
  const timePassed = new Date().getTime() - currentlyTyping[name];
  if (timePassed > timeForTyping) {
    removeUserFromTyping(name, cb);
  }
}

export function removeUserFromTyping(name: string, cb: () => void) {
  delete currentlyTyping[name];
  cb();
}

export function getTypingList(): string[] {
  return Object.keys(currentlyTyping);
}
