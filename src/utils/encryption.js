import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const refreshTokens = [];

const hashValue = async (inputValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(inputValue, salt);
  return hashValue;
};

const compareValues = async (source, target) => {
  return await bcrypt.compare(source, target);
};

const jwtToken = (inputValue) => {
  return jwt.sign(inputValue, process.env.JWT_TOKEN, { expiresIn: '15m' });
};

const refreshToken = (inputValue) => {
  const token = jwt.sign(inputValue, process.env.REFRESH_TOKEN, {
    expiresIn: '20m',
  });
  refreshTokens.push(token);
  return token;
};

export { hashValue, compareValues, jwtToken, refreshToken };
