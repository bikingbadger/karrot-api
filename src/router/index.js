import { Router } from 'express';
const router = Router();
import authRouter from './auth.js';
import kidRouter from './kid.js';
import choreRouter from './chore.js';
import { validToken } from '../utils/auth.js';

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Karrot');
});

router.use('/user', authRouter);
router.use('/kid', validToken, kidRouter);
router.use('/chore', validToken, choreRouter);

export default router;
