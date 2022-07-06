import { Router } from 'express';
const router = Router();
import authRouter from './auth.js';
import kidRouter from './kid.js';
import { validToken } from '../utils/auth.js';

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Karrot');
});

router.use('/user', authRouter);
router.use('/kid', validToken, kidRouter);

export default router;
