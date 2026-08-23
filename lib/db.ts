import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const g = globalThis as typeof globalThis & { mongooseConn?: MongooseCache };
g.mongooseConn ??= { conn: null, promise: null };
const cache = g.mongooseConn;

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
