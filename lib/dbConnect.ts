import mongoose from "mongoose";

const mongo_uri = process.env.MONGODB_URI;

async function dbConnect() {
  try {
    await mongoose.connect(mongo_uri!);
  } catch (error) {
    throw new Error("Connection failed");
  }
}

export default dbConnect;
