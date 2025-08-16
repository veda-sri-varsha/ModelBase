// const mongoose = require("mongoose");
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    tls: true, // enforce TLS
    tlsAllowInvalidCertificates: false,
  });
};

connectDB();
// .then(() => {
//   console.log("Database connected successfully");
// })
// .catch((error) => {
//   console.error("Database connection failed:", error);
// });

export default connectDB;
