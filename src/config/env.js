import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  VERCEL_API_TOKEN: process.env.VERCEL_API_TOKEN,
  VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
  ALLOWED_ORIGINS: (() => {
    const raw = process.env.ALLOWED_ORIGINS;
    if (!raw) return ["http://localhost:5173", "http://localhost:8080"];
    try {
      const trimmed = raw.trim();
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        return JSON.parse(trimmed);
      }
    } catch (e) {
    }
    return raw.split(",").map(origin => origin.trim().replace(/^["']|["']$/g, ""));
  })(),
};


