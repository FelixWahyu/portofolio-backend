import express from "express";
import cors from "cors";
import wakatimeRoute from "./routes/wakatimeRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/wakatime", wakatimeRoute);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
