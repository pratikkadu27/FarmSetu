import mongoose, { Schema, model, models } from 'mongoose';

const DealSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['fruits', 'vegetables', 'grains'], required: true },
  totalQuantity: { type: Number, required: true },
  bookedQuantity: { type: Number, default: 0 },
  pricePerUnit: { type: Number, required: true },
  marketPrice: { type: Number, required: true },
  unit: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'closed', 'completed'], default: 'active' },
  description: { type: String, required: true },
  image: { type: String },
}, {
  timestamps: true,
});

const Deal = models.Deal || model('Deal', DealSchema);

export default Deal;
