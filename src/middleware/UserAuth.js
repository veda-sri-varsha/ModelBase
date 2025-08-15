import jwt from "jsonwebtoken";
import User from "./../model/User.js";
// const JWT_SECRET = 'SecretKey';

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("No token provided");
    }

    const decodeObj = await jwt.verify(token, "secretKey");
    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error:" + error.message);
  }
};

export default UserAuth;
