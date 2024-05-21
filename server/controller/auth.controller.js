import { validationResult } from "express-validator";
import { Error } from "mongoose";
import { user } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signup = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    const error = new Error("Password not match");
    error.statusCode = 401;
    error.message = "Password not match";
    throw error;
  }

  user
    .findOne({ email: email })
    .then((response) => {
      if (response) {
        const err = new Error("User Already Exist");
        err.statusCode = 409;
        return next(err);
      }

      return bcrypt.hash(password, 12);
    })
    .then((hasPassword) => {
      const encryptPassword = hasPassword;
      const ip = req.clientIp;

      const newUser = new user({
        name: name,
        email: email,
        password: encryptPassword,
        ip: ip,
      });

      return newUser.save();
    })
    .then((user) => {
      if (!user) {
        const error = new Error("Something went wrong");
        error.statusCode = 500;
        next(error);
      }

      res.status(200).json({ message: "Signup successfully" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }

      next(error);
    });
};

export const postLogin = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const { email, password } = req.body;

  let newUserData;

  user
    .findOne({ email: email })
    .then((userData) => {
      if (!userData) {
        const error = new Error("No user found");
        error.statusCode = 403;
        return next(error);
      }

      newUserData = userData;

      const userPassword = userData.password;

      return bcrypt.compare(password, userPassword);
    })
    .then((match) => {
      if (!match) {
        const error = new Error("password not match");
        error.statusCode = 403;
        return next(error);
      }

      const jwtSecret = process.env.JWT_SECRET;
      const clientUserAgent = req.headers["user-agent"];
      const token = jwt.sign(
        {
          id: newUserData._id,
          email: email,
          userAgent: clientUserAgent,
        },
        jwtSecret,
        { expiresIn: "24h" },
      );

      const cookieDomain = process.env.COOKIE_DOMAIN.trim();
      const isProduction = process.env.ISPRODUCTION;
      const cookieExpire = process.env.COOKIE_EXPIRE;

      const options = {
        maxAge: cookieExpire,
        domain: cookieDomain,
        httpOnly: true,
      };

      if (isProduction === "true") {
        options.secure = true;
        options.sameSite = "None";
      }

      res.cookie("user_token", token, options);
      res.cookie("isLogin", true, { ...options, httpOnly: false });
      res.status(200).json({
        message: "login done",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const postLogout = (req, res, next) => {
  const cookieDomain = process.env.COOKIE_DOMAIN.trim();
  const isProduction = process.env.ISPRODUCTION;
  const cookieExpire = process.env.COOKIE_EXPIRE;

  const options = {
    maxAge: cookieExpire,
    domain: cookieDomain,
    httpOnly: true,
  };

  if (isProduction === "true") {
    options.secure = true;
    options.sameSite = "None";
  }
  res.clearCookie("user_token", options);
  res.clearCookie("isLogin", options);
  res.status(200).json({ messgae: "logout done" });
};
