import express from "express";
import jwt from "jsonwebtoken";
import * as achievementController from "../controllers/achievementController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { env } from "../config/env.js";

const router = express.Router();

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
    }
  }
  next();
};

router.get("/", optionalAuth, achievementController.getAllAchievements);
router.get("/stats", optionalAuth, achievementController.getAchievementStats);
router.get("/types", optionalAuth, achievementController.getAchievementTypes);
router.get("/:id", optionalAuth, achievementController.getAchievementById);

router.post("/", authMiddleware, upload.single("image"), achievementController.createAchievement);
router.put("/:id/toggle-publish", authMiddleware, achievementController.togglePublishAchievement);
router.put("/:id", authMiddleware, upload.single("image"), achievementController.updateAchievement);
router.delete("/:id", authMiddleware, achievementController.deleteAchievement);

export default router;
