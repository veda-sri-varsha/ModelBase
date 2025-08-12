import express from "express";
import connectDB from "./config/database.js";
import User from "./model/users.js";

const app = express();

app.post("/home", (req, res) => {
  res.send("Welcome to the User API");
});

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   name: "Veda",
  //   age: 25,
  //   email: "veda@example.com"
  // }

  const user = new User({
    name: "Lv",
    age: 22,
    email: "lv@example.com",
  });
  try {
    await user.save();
    res.send("User registered successfully");
  } catch (arr) {
    res.status(400).send("Error registering user: " + arr.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");

    app.listen(5000, () => {
      console.log("Server is successfully listening on port 5000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
