import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = (userId: string, role: string): string => {
  const secret = config.jwt.secret;
  const expiresIn = config.jwt.expiresIn;
  
  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn } as any
  );
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const secret = config.jwt.secret;
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};
