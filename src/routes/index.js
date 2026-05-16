import express from "express";
import wakatimeRoute from "./wakatimeRoute.js";
import authRoute from "./authRoute.js";

const router = express.Router();

router.use("/wakatime", wakatimeRoute);
router.use("/auth", authRoute);

export default router;
