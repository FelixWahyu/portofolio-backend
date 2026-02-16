import express from "express";
import { getWakaTimeStats } from "../controllers/wakatimeController.js";

const router = express.Router();

router.get("/", getWakaTimeStats);

export default router;
