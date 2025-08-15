// const mongoose = require("mongoose");
import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vedasrivarsha1126:s8lUvJUokXRk3S9x@dev.wfbantt.mongodb.net/?retryWrites=true&w=majority&appName=dev"
  );
};

connectDB();
// .then(() => {
//   console.log("Database connected successfully");
// })
// .catch((error) => {
//   console.error("Database connection failed:", error);
// });

export default connectDB;
