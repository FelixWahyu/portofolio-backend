import express from "express";
import jwt from "jsonwebtoken";
import * as projectController from "../controllers/projectController.js";
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

router.get("/", optionalAuth, projectController.getAllProjects);
router.get("/stats", optionalAuth, projectController.getDashboardStats);
router.get("/:id", optionalAuth, projectController.getProjectById);

router.post("/", authMiddleware, upload.single("image"), projectController.createProject);
router.put("/:id/toggle-publish", authMiddleware, projectController.togglePublishProject);
router.put("/:id", authMiddleware, upload.single("image"), projectController.updateProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);

export default router;
