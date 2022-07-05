import { Router } from 'express';
import User from '../model/User.js';
const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);
  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default authRouter;
