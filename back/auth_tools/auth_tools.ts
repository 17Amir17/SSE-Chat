import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWTPayload, ValidTokens } from '../services/types';

const SECRET: string = process.env.SECRET || 'secret';

const validRefreshTokens: ValidTokens = {};

export function encrypt(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compare(hash: string, password: string | Buffer) {
  return bcrypt.compareSync(password, hash);
}

export function generateAccessToken(data: JWTPayload) {
  return generateToken(data, '10h');
}

export function generateRefreshToken(data: JWTPayload) {
  const token = generateToken(data, '1h');
  validRefreshTokens[token] = '.';
  return token;
}

export function generateToken(data: JWTPayload, exp: string) {
  return jwt.sign(data, SECRET, {
    expiresIn: exp,
  });
}

export function validateToken(accessKey: string) {
  try {
    return jwt.verify(accessKey, SECRET);
  } catch (error) {
    return false;
  }
}

export function removeRefreshToken(token: string) {
  try {
    delete validRefreshTokens[token];
  } catch (error) {}
}

export function isRefreshTokenValid(token: string) {
  return !!validRefreshTokens[token];
}
