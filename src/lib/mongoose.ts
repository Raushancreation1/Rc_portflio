import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI. Please set it in .env.local');
}

// Avoid multiple connections in dev with HMR
let cached = (global as any)._mongoose || { conn: null as typeof mongoose | null, promise: null as Promise<typeof mongoose> | null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // You can pass options here if needed
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  (global as any)._mongoose = cached;
  return cached.conn;
}
