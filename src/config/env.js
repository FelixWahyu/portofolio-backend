import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
};
