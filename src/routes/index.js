import express from "express";
import wakatimeRoute from "./wakatimeRoute.js";
import authRoute from "./authRoute.js";
import projectRoute from "./projectRoute.js";
import achievementRoute from "./achievementRoute.js";
import experienceRoute from "./experienceRoute.js";
import resumeRoute from "./resumeRoute.js";

const router = express.Router();

router.use("/wakatime", wakatimeRoute);
router.use("/auth", authRoute);
router.use("/projects", projectRoute);
router.use("/achievements", achievementRoute);
router.use("/experiences", experienceRoute);
router.use("/resumes", resumeRoute);

export default router;



