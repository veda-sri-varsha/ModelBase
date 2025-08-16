import express from 'express';
import validateSignupData from "../../utils/validation.js";
import bcrypt from 'bcrypt';
import User from '../../model/User.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { name, age, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      name,
      age,
      email: email.trim().toLowerCase(),
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
    console.log(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

export default router;