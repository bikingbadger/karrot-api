import { Router } from 'express';
import Chore from '../model/Chore.js';

const choreRouter = new Router();

choreRouter.post('/create', async (req, res) => {
  const user = req.user;
  const choreData = req.body;

  const chore = new Chore({
    name: choreData.name,
    icon: choreData.icon,
    value: choreData.value,
  });

  const exists = await Chore.findOne({
    name: choreData.name,
  });
  if (exists)
    return res.status(400).json({ error: { message: 'Chore exists' } });

  try {
    const savedChore = await chore.save();
    res.status(200).json(savedChore);
  } catch (error) {
    res.status(400).send(error);
  }
});

choreRouter.get('/allChores', async (req, res) => {
  console.log(req.user);
  if (!req.user)
    res.status(401).json({ status: 'error', message: 'Unauthorized User' });

  //const parentId = req.user.id;
  const chores = await Chore.find({});

  res.status(200).json(chores);
});

export default choreRouter;
