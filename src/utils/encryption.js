import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashValue = async (inputValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(inputValue, salt);
  return hashValue;
};

const compareValues = async (source, target) => {
  return await bcrypt.compare(source, target);
};

const jwtToken = (inputValue) => {
  return jwt.sign(inputValue, process.env.JWT_TOKEN);
};

export { hashValue, compareValues, jwtToken };
