import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { env } from "./config/env.js";
import { errorResponse } from "./utils/responseHelper.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = env.ALLOWED_ORIGINS;
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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
