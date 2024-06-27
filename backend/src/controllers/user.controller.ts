import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import userModel from "../models/user.model";

export const getUserData: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!userId) throw createHttpError(401, "parameters are missing");
    if (!mongoose.isValidObjectId(userId))
      throw createHttpError(400, "Invalid user ID");

    const user = await userModel.findById(userId).exec();

    if (!user) throw createHttpError(404, "This user does not exist.");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
