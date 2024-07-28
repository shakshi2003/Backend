import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 }
});

export default model('Item', ItemSchema);