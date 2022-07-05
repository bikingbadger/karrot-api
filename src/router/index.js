import { Router } from 'express';
const router = Router();
import authRouter from './auth.js';

router.use('/user', authRouter);

export default router;
