import express from "express";
import cors from "cors";
import wakatimeRoute from "./routes/wakatimeRoute.js";

const app = express();

app.use(cors());
app.use("/api/wakatime", wakatimeRoute);

export default app;
