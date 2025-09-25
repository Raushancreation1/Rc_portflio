import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ContactMessage from '@/models/ContactMessage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: 'name, email, subject, and message are required' }, { status: 400 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ ok: false, error: 'Server not configured: MONGODB_URI is missing' }, { status: 500 });
    }

    await dbConnect();
    const doc = await ContactMessage.create({ name, email, subject, message });
    return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
