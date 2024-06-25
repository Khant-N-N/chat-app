import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";

interface User {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser: RequestHandler = async (req, res, next) => {
  const { username, email, password }: User = req.body;
  try {
    if (!username || !email || !password)
      throw createHttpError(400, "parameters are missing");

    const existingUserEmail = await userModel.findOne({ email });

    if (existingUserEmail)
      throw createHttpError(400, "User with current email already exist.");

    const existingUserName = await userModel.findOne({ username });

    if (existingUserName)
      throw createHttpError(400, "User with current username already exist.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // req.session.userId = newUser._id
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error in register", error);
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { username, email, password }: User = req.body;
  try {
    if (!email && !username)
      throw createHttpError(400, "parameters are missing");
    if (!password) throw createHttpError(400, "parameters are missing");

    const findUser = username
      ? await userModel.findOne({ username: username }).select("+password")
      : await userModel.findOne({ email: email }).select("+password");
    if (!findUser) throw createHttpError(401, "invalid credentials");

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch) throw createHttpError(401, "invalid credentials");

    res.status(200).json(findUser);
  } catch (error) {
    console.log("error in login", error);
    next(error);
  }
};
