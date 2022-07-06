import { Router } from 'express';
import Kid from '../model/Kid.js';

const kidRouter = new Router();

/**
 * POST: Create
 *
 * Creates a new kid with the parent id supplied
 *
 * Parameters
 * name: String
 * icon: String
 * parentId: String
 */
kidRouter.post('/create', async (req, res) => {
  const user = req.user;
  const kidData = req.body;

  const kid = new Kid({
    name: req.body.name,
    icon: req.body.icon,
    parentId: req.body.parentId,
  });

  console.log(req.body);
  // Check that the kid does not already exist for the parent
  const exists = await Kid.findOne({
    name: req.body.name,
    parentId: req.body.parentId,
  });
  console.log(exists);
  if (exists)
    return res.status(400).json({ error: { message: 'Kid exists for parent' } });

  try {
    const savedKid = await kid.save();
    res.status(200).json(savedKid);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default kidRouter;
