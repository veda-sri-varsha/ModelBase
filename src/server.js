import express from "express";
import connectDB from "./config/database.js";
import User from "./model/User.js";
import cookieParser from "cookie-parser";
import UserAuth from "../src/middleware/UserAuth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/sendRequest", UserAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending Connection Request");
  res.send("Connection sent :" + user.name);
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching feed: " + err.message);
  }
});


connectDB()
  .then(() => {
    console.log("Database connection established...");

    app.listen(7000, () => {
      console.log("Server is successfully listening on port 7000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
