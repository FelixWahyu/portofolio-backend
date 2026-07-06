import express from "express";
import jwt from "jsonwebtoken";
import * as resumeController from "../controllers/resumeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadPdfMiddleware } from "../middlewares/uploadMiddleware.js";
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
      // Proceed without req.user if token is invalid
    }
  }
  next();
};

// Public routes
router.get("/active", resumeController.getActiveResume);

// Admin routes
router.get("/", optionalAuth, resumeController.getAllResumes);
router.get("/stats", optionalAuth, resumeController.getResumeStats);
router.get("/:id", optionalAuth, resumeController.getResumeById);

router.post("/", authMiddleware, uploadPdfMiddleware.single("file"), resumeController.createResume);
router.put("/:id", authMiddleware, uploadPdfMiddleware.single("file"), resumeController.updateResume);
router.put("/:id/activate", authMiddleware, resumeController.setActiveResume);
router.delete("/:id", authMiddleware, resumeController.deleteResume);

export default router;
