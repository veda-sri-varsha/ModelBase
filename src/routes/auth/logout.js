import express from "express";

const router = express.Router();

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // set true if you're using HTTPS
  });
  res.send("Logged out successfully!");
});

export default router;