import mongoose from 'mongoose';

// Avoid multiple connections in dev with HMR
let cached = (global as any)._mongoose || { conn: null as typeof mongoose | null, promise: null as Promise<typeof mongoose> | null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI as string | undefined;
    if (!uri) {
      throw new Error('Missing MONGODB_URI. Please set it in the environment (e.g. .env.local or Vercel Project Settings)');
    }
    cached.promise = mongoose.connect(uri, {
      // You can pass options here if needed
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  (global as any)._mongoose = cached;
  return cached.conn;
}
