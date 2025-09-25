import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  // We throw a descriptive error so devs know they must set the env var
  throw new Error('Missing MONGODB_URI. Please set it in .env.local');
}

const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In dev, use a global variable so the client is cached across HMR reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In prod, create a new client per process
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
