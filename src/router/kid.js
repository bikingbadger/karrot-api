import { Router } from 'express';
import Kid from '../model/Kid.js';

const kidRouter = new Router();

kidRouter.post('/create', async (req, res) => {
  const user = req.user;
  const kidData = req.body;

  const kid = new Kid({
    name: req.body.name,
    icon: req.body.icon,
    parentId: req.user.id,
  });

  try {
    const savedKid = await kid.save();
    res.status(200).json(savedKid);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default kidRouter;
