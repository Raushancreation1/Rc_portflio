import { MongoClient, MongoClientOptions } from 'mongodb';

const options: MongoClientOptions = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export default function getMongoClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const uri = process.env.MONGODB_URI as string | undefined;
      if (!uri) {
        throw new Error('Missing MONGODB_URI. Please set it in the environment (e.g. .env.local or Vercel Project Settings)');
      }
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise!;
  }

  if (!clientPromise) {
    const uri = process.env.MONGODB_URI as string | undefined;
    if (!uri) {
      throw new Error('Missing MONGODB_URI. Please set it in the environment (e.g. .env.local or Vercel Project Settings)');
    }
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}
