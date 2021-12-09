export interface ErrorCodes {
  [key: string]: ErrorCode;
}

export interface ErrorCode {
  message: string;
  code: number;
}
