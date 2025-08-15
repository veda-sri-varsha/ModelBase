import express from 'express';
import UserAuth from '../../middleware/UserAuth';

const router = express.Router();


router.get("/profile", UserAuth, async (req, res) => {
  try {
    const user = await req.user;
    if (!user) {
      throw new Error("User not found");
    }

    res.send(user);
  } catch (err) {
    res.send("Error:" + err.message);
  }
});