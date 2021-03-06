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

const generateJwtToken = (inputValue) => {
  const token = jwt.sign(inputValue, process.env.JWT_TOKEN, {
    expiresIn: '15m',
  });
  return token;
};

const generateRefreshToken = (inputValue) => {
  const token = jwt.sign(inputValue, process.env.REFRESH_TOKEN, {
    expiresIn: '20m',
  });
  refreshTokens.push(token);
  return token;
};

const refreshTokenExists = (token) => {
  return refreshTokens.includes(token);
};

const regenerateTokens = async (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    // Check if any error occured
    if (err) return { status: 'error', message: err };
    return {
      status: 'success',
      accessToken: generateJwtToken({ id: user.id }),
      refreshToken: generateRefreshToken({ id: user.id }),
    };
  });
};

const validToken = (req, res, next) => {
  //get token from request header
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    res.status(403).json({
      status: 'error',
      message: 'User not authorized, make sure Header contains token',
    });
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    // Check if any error occured
    console.log('validToken', err);
    if (err) return res.status(403).json({ status: 'error', message: err });
    console.log('user', user);
    req.user = user;
    next();
  });
};

export {
  hashValue,
  compareValues,
  generateRefreshToken,
  generateJwtToken,
  refreshTokenExists,
  regenerateTokens,
  validToken,
};
