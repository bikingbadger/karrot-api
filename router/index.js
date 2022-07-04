import { Router } from 'express';
const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'welcome to karrot' }),
);

router.get('/api', (req, res) =>
  res.status(200).json({ message: 'welcome to karrot api' }),
);

export default router;