import { Router } from 'express';
import Item from '../models/Item';
import auth from '../middleware/auth';
const router = Router();

router.post('/item', auth, async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).send(item);
});

router.get('/item', auth, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.put('/item/:id', auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/item/:id', auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send('Item deleted');
});

export default router;