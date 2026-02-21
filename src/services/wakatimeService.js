// import fetch from "node-fetch";
import { env } from "../config/env.js";

export const fetchWakaTimeStats = async () => {
  // console.log("API KEY:", env.WAKATIME_API_KEY ? "exists" : "MISSING");
  // console.log("Fetching wakatime...");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    if (!env.WAKATIME_API_KEY) {
      throw new Error("WAKATIME_API_KEY is missing");
    }

    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: "Basic " + Buffer.from(`${env.WAKATIME_API_KEY}:`).toString("base64"),
      },
      signal: controller.signal,
    });
    // console.log("Response status:", response.status);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch wakatime API");
    }

    return result.data;
  } catch (err) {
    console.log("Error wakatime:", err.message);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};
