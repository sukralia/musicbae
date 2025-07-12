import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Song from '@/models/Song';
import User from '@/models/User';
import ArtistProfile from '@/models/ArtistProfile';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const songId = params.id;

    const song = await Song.findOne({
      _id: songId,
      approvalStatus: 'approved',
    }).populate({
      path: 'artistId',
      select: 'name',
    });

    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    const songData = {
      id: song._id,
      name: song.name,
      description: song.description,
      previewUrl: song.previewUrl,
      format: song.format,
      totalTips: song.totalTips,
      artist: {
        id: song.artistId._id,
        name: song.artistId.name,
      },
    };

    return NextResponse.json(songData);
  } catch (error) {
    console.error('Get song error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch song' },
      { status: 500 }
    );
  }
} 