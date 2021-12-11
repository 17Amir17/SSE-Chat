import dotenv from 'dotenv';
dotenv.config();

const SECRET: string = process.env.SECRET || 'secret';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../services/types';

export function encrypt(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compare(hash: string, password: string | Buffer) {
  return bcrypt.compareSync(password, hash);
}

export function generateAccessToken(data: JWTPayload) {
  return generateToken(data, '10s');
}

export function generateRefreshToken(data: JWTPayload) {
  return generateToken(data, '1h');
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
