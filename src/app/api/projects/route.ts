import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Project from '@/models/Project';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ ok: false, error: 'Server not configured: MONGODB_URI is missing' }, { status: 500 });
    }
    await dbConnect();
    const docs = await Project.find({}).sort({ _id: -1 }).lean();
    const projects = docs.map((d: any) => ({ ...d, id: String(d._id), _id: undefined }));
    return NextResponse.json({ ok: true, projects });
  } catch (err: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('GET /api/projects error:', err);
    }
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown error', stack: process.env.NODE_ENV !== 'production' ? String(err?.stack || '') : undefined },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ ok: false, error: 'Server not configured: MONGODB_URI is missing' }, { status: 500 });
    }
    await dbConnect();
    const body = await req.json();
    const { id, ...updates } = body || {};
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    // Basic whitelist: only allow known fields to be updated
    const allowed: Record<string, boolean> = {
      title: true,
      description: true,
      tags: true,
      image: true,
      githubUrl: true,
      liveUrl: true,
    };
    const $set: Record<string, any> = {};
    Object.keys(updates || {}).forEach((k) => {
      if (allowed[k]) {
        $set[k] = updates[k];
      }
    });

    if (Object.keys($set).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const res = await Project.findByIdAndUpdate(id, { $set }, { new: false });
    if (!res) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Basic validation
    const { title, description, tags, image, githubUrl, liveUrl } = body || {};
    if (!title || !description) {
      return NextResponse.json({ error: 'title and description are required' }, { status: 400 });
    }
    if (tags && !Array.isArray(tags)) {
      return NextResponse.json({ error: 'tags must be an array of strings' }, { status: 400 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ ok: false, error: 'Server not configured: MONGODB_URI is missing' }, { status: 500 });
    }
    await dbConnect();
    const doc = await Project.create({
      title,
      description,
      tags: (tags || []).map((t: any) => String(t)),
      image: image || '',
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
    });
    return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
