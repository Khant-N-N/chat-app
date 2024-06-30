import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import userModel from "../models/user.model";

export const getAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const authUser = await userModel.findById(req.session.userId).exec();
    if (!authUser) throw createHttpError(404, "user not found.");
  } catch (error) {
    next(error);
  }
};

export const getUserData: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!userId) throw createHttpError(400, "parameters are missing");
    if (!mongoose.isValidObjectId(userId))
      throw createHttpError(400, "Invalid user ID");

    const user = await userModel.findById(userId).exec();

    if (!user) throw createHttpError(404, "This user does not exist.");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const findUser: RequestHandler = async (req, res, next) => {
  const keyword = req.query.keyword as string;
  try {
    if (!keyword) throw createHttpError(400, "Add atleast 1 keyword to find.");
    const user = await userModel.find({
      username: { $regex: keyword, $options: "i" },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
