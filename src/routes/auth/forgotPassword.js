import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../../model/User.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User with this email does not exist");
    }

    // Create a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Save token & expiry to user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Send reset email (example using nodemailer)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:7000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
    res.send("Password reset email sent!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

export default router;