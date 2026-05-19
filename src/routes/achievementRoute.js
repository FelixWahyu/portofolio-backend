import express from "express";
import jwt from "jsonwebtoken";
import * as achievementController from "../controllers/achievementController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { env } from "../config/env.js";

const router = express.Router();

// Optional Auth Middleware to detect if logged in admin is fetching
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // Proceed without req.user if token is invalid
    }
  }
  next();
};

// Public/Optional Routes
router.get("/", optionalAuth, achievementController.getAllAchievements);
router.get("/stats", optionalAuth, achievementController.getAchievementStats);
router.get("/types", optionalAuth, achievementController.getAchievementTypes);
router.get("/:id", optionalAuth, achievementController.getAchievementById);

// Protected Admin Routes (Require auth + file uploading)
router.post("/", authMiddleware, upload.single("image"), achievementController.createAchievement);
router.put("/:id", authMiddleware, upload.single("image"), achievementController.updateAchievement);
router.delete("/:id", authMiddleware, achievementController.deleteAchievement);

export default router;
