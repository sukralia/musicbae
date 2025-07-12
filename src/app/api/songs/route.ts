import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Song from '@/models/Song';
import ArtistProfile from '@/models/ArtistProfile';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = extractTokenFromHeader(authHeader);
    const payload = verifyToken(token);

    if (payload.role !== 'artist') {
      return NextResponse.json(
        { error: 'Only artists can upload songs' },
        { status: 403 }
      );
    }

    const { name, description, fileUrl, previewUrl, format } = await request.json();

    // Validate input
    if (!name || !description || !fileUrl || !previewUrl || !format) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!['mp3', 'wav'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Only MP3 and WAV are supported' },
        { status: 400 }
      );
    }

    // Check if artist is approved
    const artistProfile = await ArtistProfile.findOne({ userId: payload.userId });
    if (!artistProfile || !artistProfile.isApproved) {
      return NextResponse.json(
        { error: 'Artist profile must be approved before uploading songs' },
        { status: 403 }
      );
    }

    // Check song limit (max 4 songs)
    const existingSongs = await Song.countDocuments({ artistId: payload.userId });
    if (existingSongs >= 4) {
      return NextResponse.json(
        { error: 'Maximum 4 songs allowed per artist' },
        { status: 400 }
      );
    }

    // Create song
    const song = new Song({
      artistId: payload.userId,
      name,
      description,
      fileUrl,
      previewUrl,
      format,
      approvalStatus: 'pending',
    });

    await song.save();

    return NextResponse.json({
      message: 'Song uploaded successfully',
      song: {
        id: song._id,
        name: song.name,
        description: song.description,
        approvalStatus: song.approvalStatus,
      },
    });
  } catch (error) {
    console.error('Upload song error:', error);
    return NextResponse.json(
      { error: 'Failed to upload song' },
      { status: 500 }
    );
  }
} 