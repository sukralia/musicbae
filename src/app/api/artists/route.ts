import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ArtistProfile from '@/models/ArtistProfile';
import User from '@/models/User';
import Song from '@/models/Song';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    // Build query for approved artists
    let query: any = { isApproved: true };

    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    // Get approved artist profiles
    const artistProfiles = await ArtistProfile.find(query)
      .populate({
        path: 'userId',
        select: 'name email',
      })
      .lean();

    // Get songs for each artist
    const artistsWithSongs = await Promise.all(
      artistProfiles.map(async (profile) => {
        const songs = await Song.find({
          artistId: profile.userId._id,
          approvalStatus: 'approved',
        }).select('name description previewUrl totalTips');

        return {
          id: profile.userId._id,
          name: profile.userId.name,
          photoUrl: profile.photoUrl,
          bio: profile.bio,
          genre: profile.genre,
          totalTips: profile.totalTips,
          songs: songs.map(song => ({
            id: song._id,
            name: song.name,
            description: song.description,
            previewUrl: song.previewUrl,
            totalTips: song.totalTips,
          })),
        };
      })
    );

    // Apply search filter if provided
    let filteredArtists = artistsWithSongs;
    if (search) {
      filteredArtists = artistsWithSongs.filter(artist =>
        artist.name.toLowerCase().includes(search.toLowerCase()) ||
        artist.genre.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      artists: filteredArtists,
      total: filteredArtists.length,
    });
  } catch (error) {
    console.error('Get artists error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
} 