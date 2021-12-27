"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypingList = exports.removeUserFromTyping = exports.userIsTyping = void 0;
const timeForTyping = 2000; //Miliseconds
const currentlyTyping = {};
function userIsTyping(name, cb) {
    currentlyTyping[name] = new Date().getTime();
    setTimeout(() => {
        //Check if still typing in x seconds
        checkIfTyping(name, cb);
    }, timeForTyping + 10); // The + 10 gives extra time for the later if statement
}
exports.userIsTyping = userIsTyping;
function checkIfTyping(name, cb) {
    const timePassed = new Date().getTime() - currentlyTyping[name];
    if (timePassed > timeForTyping) {
        removeUserFromTyping(name, cb);
    }
}
function removeUserFromTyping(name, cb) {
    delete currentlyTyping[name];
    cb();
}
exports.removeUserFromTyping = removeUserFromTyping;
function getTypingList() {
    return Object.keys(currentlyTyping);
}
exports.getTypingList = getTypingList;
