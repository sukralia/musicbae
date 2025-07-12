import mongoose, { Schema, Document } from 'mongoose';

export interface IArtistProfile extends Document {
  userId: mongoose.Types.ObjectId;
  photoUrl: string;
  bio: string;
  genre: string;
  tipJarBalance: number;
  totalTips: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const artistProfileSchema = new Schema<IArtistProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  photoUrl: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  genre: {
    type: String,
    required: true,
  },
  tipJarBalance: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalTips: {
    type: Number,
    default: 0,
    min: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.ArtistProfile || mongoose.model<IArtistProfile>('ArtistProfile', artistProfileSchema); 