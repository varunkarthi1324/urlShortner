import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Connected to the DB");
  } catch (error) {
    console.error("Failed to connect to the DB:", error.message);
  }
}
export default connectToDB;
