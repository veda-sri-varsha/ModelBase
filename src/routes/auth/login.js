import express from  'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    } else {
      const token = await jwt.sign({ _id: user._id }, "secretKey", {
        expiresIn: "1h",
      });
      //   console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      res.send("Login successful!!");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});