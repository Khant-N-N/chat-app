import express from "express";
import * as userControllers from "../controllers/user.controller";

const router = express.Router();

router.get("/user/:id", userControllers.getUserData);
router.get("/finduser", userControllers.findUser);

export default router;
