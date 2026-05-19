import express from "express";
import wakatimeRoute from "./wakatimeRoute.js";
import authRoute from "./authRoute.js";
import projectRoute from "./projectRoute.js";
import achievementRoute from "./achievementRoute.js";

const router = express.Router();

// Register sub-routes
router.use("/wakatime", wakatimeRoute);
router.use("/auth", authRoute);
router.use("/projects", projectRoute);
router.use("/achievements", achievementRoute);

export default router;


