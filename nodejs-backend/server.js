import express, { json } from 'express';
import { connect } from 'mongoose';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import itemRoutes from './routes/items';
require('dotenv').config();

const app = express();
app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', itemRoutes);

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.error(err));