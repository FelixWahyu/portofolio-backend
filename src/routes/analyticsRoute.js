import express from "express";
import { getPageviewsHandler, getReferrersHandler, getDevicesHandler } from "../controllers/analyticsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// All analytics routes require authentication
router.use(authMiddleware);
router.use(apiLimiter);

router.get("/pageviews", getPageviewsHandler);
router.get("/referrers", getReferrersHandler);
router.get("/devices", getDevicesHandler);

export default router;
