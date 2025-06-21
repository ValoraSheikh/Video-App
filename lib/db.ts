import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODN_URI!;

if (!MONGODB_URI) {
  throw new Error("Plz define mongodb_uri in env variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferComands: true,
      maxPoolSize: 10
    }
    mongoose
    .connect(MONGODB_URI, opts)
    .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

};
