import { getCookieValue } from "../utils/cookieHelper.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { user } from "../model/user.js";

export const validateAuth = (req, res, next) => {
  const cookieSting = req.headers.cookie;
  const cookieName = "user_token";

  const token = getCookieValue(cookieSting, cookieName);
  const isLogin = getCookieValue(cookieSting, "isLogin");

  if (isLogin !== "true") {
    const error = Error("not auth");
    error.statusCode = 403;
    error.message = "Invalid user";
    throw error;
  }
  const jwtSecret = process.env.JWT_SECRET;

  let decodeToken;

  try {
    decodeToken = jwt.verify(token, jwtSecret);
  } catch (err) {
    err.statusCode = 401;
    err.data = "invalid token";
    throw err;
  }

  const userEmail = decodeToken.email;

  user
    .findOne({ email: userEmail })
    .then((userData) => {
      if (!userData) {
        const error = Error("no user found");
        error.statusCode = 403;
        error.message = "Invalid user";
        throw error;
      }

      req.userEmail = userData.email;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
