import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Song from '@/models/Song';
import ArtistProfile from '@/models/ArtistProfile';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';
import { sendApprovalNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = extractTokenFromHeader(authHeader);
    const payload = verifyToken(token);

    if (payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get pending songs
    const pendingSongs = await Song.find({ approvalStatus: 'pending' })
      .populate({
        path: 'artistId',
        select: 'name email',
      })
      .sort({ createdAt: -1 });

    const songs = pendingSongs.map(song => ({
      id: song._id,
      name: song.name,
      description: song.description,
      format: song.format,
      createdAt: song.createdAt,
      artist: {
        id: song.artistId._id,
        name: song.artistId.name,
        email: song.artistId.email,
      },
    }));

    return NextResponse.json({ songs });
  } catch (error) {
    console.error('Get pending songs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pending songs' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = extractTokenFromHeader(authHeader);
    const payload = verifyToken(token);

    if (payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { songId, action } = await request.json();

    if (!songId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Valid song ID and action required' },
        { status: 400 }
      );
    }

    const song = await Song.findById(songId).populate({
      path: 'artistId',
      select: 'name email',
    });

    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    // Update song status
    song.approvalStatus = action === 'approve' ? 'approved' : 'rejected';
    await song.save();

    // Send notification email
    if (song.artistId.email) {
      await sendApprovalNotification(
        song.artistId.email,
        song.artistId.name,
        action === 'approve'
      );
    }

    return NextResponse.json({
      message: `Song ${action}d successfully`,
      song: {
        id: song._id,
        name: song.name,
        approvalStatus: song.approvalStatus,
      },
    });
  } catch (error) {
    console.error('Update song status error:', error);
    return NextResponse.json(
      { error: 'Failed to update song status' },
      { status: 500 }
    );
  }
} 