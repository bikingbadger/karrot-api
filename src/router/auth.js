import { Router } from 'express';
import User from '../model/User.js';
import { registerValidation, loginValidation } from '../utils/validation.js';
const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  // Validate data
  const error = await registerValidation(req.body);
  console.log(error);
  if (error) return res.status(error.status).json(error);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default authRouter;
