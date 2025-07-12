import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  type: 'tip' | 'withdrawal';
  amount: number;
  fee: number;
  status: 'pending' | 'completed' | 'failed';
  userId: mongoose.Types.ObjectId;
  songId?: mongoose.Types.ObjectId;
  stripePaymentIntentId?: string;
  stripePayoutId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  type: {
    type: String,
    enum: ['tip', 'withdrawal'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  fee: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  songId: {
    type: Schema.Types.ObjectId,
    ref: 'Song',
  },
  stripePaymentIntentId: {
    type: String,
  },
  stripePayoutId: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema); 