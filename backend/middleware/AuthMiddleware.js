import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AuthToken = async (req, res, next) => {
  try {
    const token = req.cookies.token_access;
    if (!token) {
      return res.status(403).json({
        message: "Este usuario no tiene un token",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Token no válido",
    });
  }
};
export const AuthMiddleware = {
  AuthToken,
};
