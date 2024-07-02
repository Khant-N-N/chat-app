import express from "express";
import * as userControllers from "../controllers/user.controller";

const router = express.Router();

router.get("/user/get/:id", userControllers.getUserData);
router.get("/finduser", userControllers.findUser);
router.get("/user", userControllers.getAuthUser);

export default router;
