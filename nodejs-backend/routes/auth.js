import { Router } from 'express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials');
  const isMatch = await compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;