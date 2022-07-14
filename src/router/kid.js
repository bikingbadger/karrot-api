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

  console.log('createKid\n', req.body);
  // Check that the kid does not already exist for the parent
  const exists = await Kid.findOne({
    name: req.body.name,
    parentId: req.body.parentId,
  });
  console.log('createKid\n', exists);
  if (exists)
    return res
      .status(400)
      .json({ error: { message: 'Kid exists for parent' } });

  try {
    const savedKid = await kid.save();
    res.status(200).json(savedKid);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * GET: kidsOfParent
 *
 * Return the kids for a given parent of the logged in parent
 *
 * Parameters
 * Header must contain auth token
 *
 * Returns
 * Kids: Array
 */
kidRouter.get('/kidsOfParent', async (req, res) => {
  console.log(req.user);
  if (!req.user)
    res.status(401).json({ status: 'error', message: 'Unauthorized User' });

  const parentId = req.user.id;
  const kids = await Kid.find({ parentId: parentId });

  res.status(200).json(kids);
});

/**
 * POST
 *
 * Add a chore to the kids list
 *
 * Parameter
 * Header must contain auth token
 * Child ID: String
 * Chore: Object
 */
kidRouter.post('/addChore', async (req, res) => {
  console.log('addChore',req.body);
  if (!req.user)
    res.status(401).json({ status: 'error', message: 'Unauthorized User' });

  const kid = await Kid.findOne({
    _id: req.body.kidId,
    parentId: req.user.id,
  });
  if (!kid)
    res.status(400).json({ status: 'error', message: 'Kid does not exist' });
  console.log('addChore', kid);
  kid.chores.push(req.body.chore)
  try {
    const savedKid = await kid.save();
    res.status(200).json(savedKid);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default kidRouter;
