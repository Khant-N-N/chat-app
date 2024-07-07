import { Router } from "express";
import * as authControllers from "../controllers/authenticate.controller";

const router = Router();

router.post("/log-in", authControllers.loginUser);
router.post("/register", authControllers.registerUser);
router.get("/log-out", authControllers.logOut);

export default router;
