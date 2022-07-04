import { Router } from 'express';
const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'welcome to karrot' }),
);

export default router;