import express from "express";
import * as userControllers from "../controllers/user.controller";
import { authUser } from "../utils/authUser";

const router = express.Router();

router.get("/user/get/:id", authUser, userControllers.getUserData);
router.get("/finduser", authUser, userControllers.findUser);
router.get("/user", authUser, userControllers.getAuthUser);

export default router;
