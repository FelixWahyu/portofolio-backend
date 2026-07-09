import express from "express";
import jwt from "jsonwebtoken";
import * as experienceController from "../controllers/experienceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
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
router.get("/", optionalAuth, experienceController.getAllExperiences);
router.get("/stats", optionalAuth, experienceController.getExperienceStats);
router.get("/:id", optionalAuth, experienceController.getExperienceById);

// Protected Admin Routes (Require auth)
router.post("/", authMiddleware, experienceController.createExperience);
router.put("/:id/toggle-publish", authMiddleware, experienceController.togglePublishExperience);
router.put("/:id", authMiddleware, experienceController.updateExperience);
router.delete("/:id", authMiddleware, experienceController.deleteExperience);

export default router;
