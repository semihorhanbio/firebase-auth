import jwt from 'jsonwebtoken';

export const createCustomJWT = (uid: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in the environment variables.');
  }

  const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

export const verifyCustomJWT = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in the environment variables.');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as { uid: string };
  return decoded;
};