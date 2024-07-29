import mongoose from "mongoose";
import { config } from "./config";
import app from "../app";

const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to the database.");

    app.on("error", (err) => {
      console.error("App Error: ", err);
      throw err;
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database error: ", error.message);
    }
    process.exit(1);
  }
};

export default connectDb;
