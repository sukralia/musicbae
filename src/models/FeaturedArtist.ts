import mongoose, { Schema, Document } from 'mongoose';

export interface IFeaturedArtist extends Document {
  month: string; // Format: "YYYY-MM"
  artistIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const featuredArtistSchema = new Schema<IFeaturedArtist>({
  month: {
    type: String,
    required: true,
    unique: true,
  },
  artistIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

export default mongoose.models.FeaturedArtist || mongoose.model<IFeaturedArtist>('FeaturedArtist', featuredArtistSchema); 