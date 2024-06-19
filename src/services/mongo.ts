import mongoose from "mongoose";

// MongoDB connection string
let conncetionString = process.env.MONGODB_CONNECTION_STRING;
conncetionString = conncetionString.replace(
  "<username>",
  process.env.DATABASE_USERNAME,
);
conncetionString = conncetionString.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

// Cached connection promise
const cached = {};

export default async function connectMongoDB() {
  // If the connection string is not defined, throw an error
  if (!conncetionString) {
    throw new Error("Please define the environment variable file");
  }

  // If the connection is already cached, return it
  if (cached.connection) {
    console.log("Database is already connected");
    return cached.connection;
  }

  // If the connection is not already cached, create a new connection
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      dbName: "login-system",
    };

    cached.promise = mongoose.connect(conncetionString, options);
  }

  // Wait for the connection to be ready and return it
  try {
    cached.connection = await cached.promise;
    console.log("Database is connected");
  } catch (error) {
    cached.promise = undefined;
    throw error;
  }
  return cached.connection;
}
