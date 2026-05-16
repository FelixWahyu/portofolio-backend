import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorResponse } from "./utils/responseHelper.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173", "https://www.felixws.my.id"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return errorResponse(res, "Internal Server Error", err, 500);
});

export default app;
