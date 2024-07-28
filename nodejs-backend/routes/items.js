import { Router } from 'express';
import Item from '../models/Item';
const router = Router();

router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

router.post('/items/:id/rate', async (req, res) => {
  const item = await Item.findById(req.params.id);
  item.rating = req.body.rating;
  await item.save();
  res.json(item);
});

export default router;