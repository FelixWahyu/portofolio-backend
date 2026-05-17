import express from "express";
import wakatimeRoute from "./wakatimeRoute.js";
import authRoute from "./authRoute.js";
import projectRoute from "./projectRoute.js";

const router = express.Router();

router.use("/wakatime", wakatimeRoute);
router.use("/auth", authRoute);
router.use("/projects", projectRoute);

export default router;

