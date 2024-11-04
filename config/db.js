import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected");
  } catch (err) {
    console.log("Connection failed");
    process.exit(1);
  }
};

export default connectDb;
