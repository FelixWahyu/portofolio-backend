import express from "express";
import jwt from "jsonwebtoken";
import * as experienceController from "../controllers/experienceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
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

router.get("/", optionalAuth, experienceController.getAllExperiences);
router.get("/stats", optionalAuth, experienceController.getExperienceStats);
router.get("/:id", optionalAuth, experienceController.getExperienceById);

router.post("/", authMiddleware, experienceController.createExperience);
router.put("/:id/toggle-publish", authMiddleware, experienceController.togglePublishExperience);
router.put("/:id", authMiddleware, experienceController.updateExperience);
router.delete("/:id", authMiddleware, experienceController.deleteExperience);

export default router;
