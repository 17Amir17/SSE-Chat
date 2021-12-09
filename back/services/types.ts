import { Request } from 'express';

export interface ErrorCodes {
  [key: string]: ErrorCode;
}

export interface ErrorCode {
  message: string;
  code: number;
}

export type ModifiedRequest = Request & { username?: string };
