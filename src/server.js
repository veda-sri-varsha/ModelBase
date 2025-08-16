import express from "express";
import connectDB from "./config/database.js";
import User from "./model/User.js";
import cookieParser from "cookie-parser";
import UserAuth from "./middleware/UserAuth.js";
import dotenv from "dotenv";

import signupRoutes from "./routes/auth/signup.js";
import loginRoutes from "./routes/auth/login.js";
import logoutRoutes from "./routes/auth/logout.js";
import profileRoutes from "./routes/users/profile.js";
import forgotPasswordRoutes from "./routes/auth/forgotPassword.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", signupRoutes);
app.use("/auth", loginRoutes);
app.use("/auth", logoutRoutes);
app.use("/auth", forgotPasswordRoutes);
app.use("/users", profileRoutes);


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

    app.listen(process.env.PORT, () => {
      console.log(
        `Server is Listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
