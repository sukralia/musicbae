import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Song from '@/models/Song';
import User from '@/models/User';
import ArtistProfile from '@/models/ArtistProfile';
import Transaction from '@/models/Transaction';
import { createPaymentIntent } from '@/lib/stripe';
import { sendDownloadLink } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { songId, amount, fanEmail, fanName } = await request.json();

    // Validate input
    if (!songId || !amount || amount < 1) {
      return NextResponse.json(
        { error: 'Valid song ID and amount required' },
        { status: 400 }
      );
    }

    // Get song
    const song = await Song.findOne({
      _id: songId,
      approvalStatus: 'approved',
    }).populate({
      path: 'artistId',
      select: 'name email',
    });

    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    // Find or create fan user
    let fanUser = await User.findOne({ email: fanEmail });
    if (!fanUser) {
      // Create new fan user
      fanUser = new User({
        email: fanEmail,
        name: fanName || 'Anonymous Fan',
        role: 'fan',
        password: Math.random().toString(36).slice(-8), // Temporary password
      });
      await fanUser.save();
    }

    // Create Stripe payment intent
    const paymentIntent = await createPaymentIntent(amount, {
      songId: song._id.toString(),
      fanId: fanUser._id.toString(),
      artistId: song.artistId._id.toString(),
    });

    // Create transaction record
    const transaction = new Transaction({
      type: 'tip',
      amount,
      fee: 0, // No fee on tips
      status: 'pending',
      userId: fanUser._id,
      songId: song._id,
      stripePaymentIntentId: paymentIntent.id,
    });

    await transaction.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id,
    });
  } catch (error) {
    console.error('Create tip error:', error);
    return NextResponse.json(
      { error: 'Failed to create tip' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { transactionId, paymentIntentId } = await request.json();

    // Update transaction status
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, stripePaymentIntentId: paymentIntentId },
      { status: 'completed' },
      { new: true }
    ).populate([
      { path: 'userId', select: 'email name' },
      { path: 'songId', populate: { path: 'artistId', select: 'name email' } },
    ]);

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Add tip to song
    const song = await Song.findById(transaction.songId);
    if (song) {
      song.tips.push({
        fanId: transaction.userId._id,
        amount: transaction.amount,
        date: new Date(),
      });
      await song.save();
    }

    // Update artist's tip jar
    const artistProfile = await ArtistProfile.findOne({
      userId: song?.artistId,
    });
    if (artistProfile) {
      artistProfile.tipJarBalance += transaction.amount;
      artistProfile.totalTips += transaction.amount;
      await artistProfile.save();
    }

    // Send download link email
    if (transaction.userId.email && song) {
      const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/download/${song._id}?token=${transaction._id}`;
      await sendDownloadLink(
        transaction.userId.email,
        song.name,
        song.artistId.name,
        downloadUrl
      );
    }

    return NextResponse.json({
      message: 'Tip processed successfully',
      downloadUrl: song ? `${process.env.NEXT_PUBLIC_APP_URL}/download/${song._id}?token=${transaction._id}` : null,
    });
  } catch (error) {
    console.error('Process tip error:', error);
    return NextResponse.json(
      { error: 'Failed to process tip' },
      { status: 500 }
    );
  }
} 