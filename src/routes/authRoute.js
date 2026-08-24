import express from "express";
import * as authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);
router.put("/profile", authMiddleware, authController.updateProfile);

export default router;
