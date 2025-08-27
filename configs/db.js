import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    throw err;
  }
};

export default connectToDB;