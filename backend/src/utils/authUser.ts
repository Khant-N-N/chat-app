import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const authUser: RequestHandler = async (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(createHttpError(401, "Please login your account."));
  }
};
