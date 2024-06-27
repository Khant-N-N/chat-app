import { Router } from "express";
import * as authControllers from "../controllers/authenticate.controller";

const router = Router();

router.post("/login", authControllers.loginUser);
router.post("/register", authControllers.registerUser);
router.get("/logout", authControllers.logOut);

export default router;
