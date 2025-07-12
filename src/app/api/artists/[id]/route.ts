import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ArtistProfile from '@/models/ArtistProfile';
import User from '@/models/User';
import Song from '@/models/Song';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const artistId = params.id;

    // Get artist profile
    const artistProfile = await ArtistProfile.findOne({
      userId: artistId,
      isApproved: true,
    }).populate({
      path: 'userId',
      select: 'name email',
    });

    if (!artistProfile) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    // Get approved songs for this artist
    const songs = await Song.find({
      artistId,
      approvalStatus: 'approved',
    }).select('name description previewUrl totalTips fileUrl format');

    const artist = {
      id: artistProfile.userId._id,
      name: artistProfile.userId.name,
      photoUrl: artistProfile.photoUrl,
      bio: artistProfile.bio,
      genre: artistProfile.genre,
      totalTips: artistProfile.totalTips,
      tipJarBalance: artistProfile.tipJarBalance,
      songs: songs.map(song => ({
        id: song._id,
        name: song.name,
        description: song.description,
        previewUrl: song.previewUrl,
        fileUrl: song.fileUrl,
        format: song.format,
        totalTips: song.totalTips,
      })),
    };

    return NextResponse.json(artist);
  } catch (error) {
    console.error('Get artist error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    );
  }
} 