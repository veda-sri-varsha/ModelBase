// const mongoose = require("mongoose");
import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vedasrivarsha1126:BtUR1CfPeQhwfcFN@devtinnder.0pnwsxj.mongodb.net/?retryWrites=true&w=majority&appName=DevTinnder"
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
