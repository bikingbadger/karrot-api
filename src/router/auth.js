import { Router } from 'express';
import User from '../model/User.js';
import { registerValidation, loginValidation } from '../utils/validation.js';
import {
  hashValue,
  compareValues,
  generateRefreshToken,
  generateJwtToken,
  refreshTokenExists,
  regenerateTokens,
} from '../utils/encryption.js';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  // Validate data
  const error = await registerValidation(req.body);
  if (error) return res.status(error.status).json(error);

  // Create user object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await hashValue(req.body.password),
  });

  // Check user doesn't exist in DB
  const exists = await User.findOne({ email: req.body.email });
  if (exists)
    return res.status(400).json({ error: { message: 'User exists' } });

  // Save the user
  try {
    const savedUser = await user.save();
    res.status(200).json({ id: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

authRouter.post('/login', async (req, res) => {
  // Validate data
  const error = await loginValidation(req.body);
  if (error) return res.status(error.status).json(error);

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ error: { message: 'User does not exist' } });

  // Check passwords match
  const passwordsMatch = await compareValues(req.body.password, user.password);
  if (!passwordsMatch)
    return res.status(400).json({ error: { message: 'User does not exist' } });
  res.status(200).json({
    status: 'success',
    accessToken: generateJwtToken({ id: user._id }),
    refreshToken: generateRefreshToken({ id: user._id }),
  });
});

authRouter.post('/refreshToken', async (req, res) => {
  // Check that the refresh token exists
  if (!refreshTokenExists(req.body.refreshToken))
    return res.status(400).json({ error: { message: 'Invalid token' } });

  // Regenerate tokens
  const tokens = await regenerateTokens(req.body.refreshToken);
  console.log('tokens',tokens);

  if (tokens.status === 'error')
    return res
      .status(400)
      .json({ error: { message: 'Could not generate token' } });

  res.status(200).json({
    status: 'success',
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
});

export default authRouter;
