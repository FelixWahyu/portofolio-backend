import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};
