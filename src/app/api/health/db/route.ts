import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ ok: false, error: 'Server not configured: MONGODB_URI is missing' }, { status: 500 });
    }
    await dbConnect();
    const state = mongoose.connection.readyState; // 1 = connected
    const states: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    return NextResponse.json({ ok: true, status: states[state] || String(state) });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
