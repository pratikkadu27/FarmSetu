import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' },
  city: { type: String },
  phone: { type: String },
}, {
  timestamps: true,
});

const User = models.User || model('User', UserSchema);

export default User;
