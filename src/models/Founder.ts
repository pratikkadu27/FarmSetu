import mongoose, { Schema, model, models } from 'mongoose';

const FounderSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String },
  linkedIn: { type: String },
}, {
  timestamps: true,
});

const Founder = models.Founder || model('Founder', FounderSchema);

export default Founder;
