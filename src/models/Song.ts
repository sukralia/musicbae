import mongoose, { Schema, Document } from 'mongoose';

export interface ITip {
  fanId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
}

export interface ISong extends Document {
  artistId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  fileUrl: string;
  previewUrl: string;
  format: 'mp3' | 'wav';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  tips: ITip[];
  totalTips: number;
  createdAt: Date;
  updatedAt: Date;
}

const tipSchema = new Schema<ITip>({
  fanId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const songSchema = new Schema<ISong>({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  previewUrl: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    enum: ['mp3', 'wav'],
    required: true,
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  tips: [tipSchema],
  totalTips: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
});

// Update totalTips when tips array changes
songSchema.pre('save', function(next) {
  this.totalTips = this.tips.reduce((sum, tip) => sum + tip.amount, 0);
  next();
});

export default mongoose.models.Song || mongoose.model<ISong>('Song', songSchema); 