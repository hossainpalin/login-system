import { MongoClient, ServerApiVersion } from "mongodb";

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

if (!conncetionString) {
  throw new Error(
    "Invalid/Missing environment variables for MongoDB connection string.",
  );
}

const uri = conncetionString;
const options = {
  dbName: "login-system",
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
