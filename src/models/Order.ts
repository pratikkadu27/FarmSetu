import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  dealId: { type: Schema.Types.ObjectId, ref: 'Deal', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userCity: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'delivered', 'cancelled'], default: 'pending' },
}, {
  timestamps: true,
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
