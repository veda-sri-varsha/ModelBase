import express from "express";
import connectDB from "./config/database.js";
import User from "./model/users.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// app.get("/", (req, res) => {
//   res.send("Welcome to the User API");
// });

// app.post("/signup", async (req, res) => {
//   // const userObj = {
//   //   name: "Veda",
//   //   age: 25,
//   //   email: "veda@example.com"
//   // }

// const user = new User({
//   name: "apple",
//   age: 17,
//   email: "@example.com",
// });
//   try {
//     await user.save();
//     res.send("User registered successfully");
//   } catch (arr) {
//     res.status(400).send("Error registering user: " + arr.message);
//   }
// });

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const user = new User(req.body); // Create a new instance of User model
  try {
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  try {
    // const {email} = req.body;
    const email = req.query.email; // Use query parameter for email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

// Feed API - get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching feed: " + err.message);
  }
});

// Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const email = req.body.email;
    // const result = await User.deleteOne({ email });
    const result = await User.findByIdAndDelete({ _id: userId });
    // const result = await User.deleteOne({ _id: userId });
    if (!result) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});

// Update user data
app.patch("/user", async (req, res) => {
  const userId = req.query.userId;
  const data = req.body;

  try {
    const allowedUpdates = ["name", "age"];
    const isValidOperation = Object.keys(data).every((key) =>
      allowedUpdates.includes(key)
    );
    

    if (!isValidOperation) {
      throw new Error("Invalid updates!");
    }
   
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
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
