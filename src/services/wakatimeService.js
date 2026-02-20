import fetch from "node-fetch";
import { env } from "../config/env.js";

export const fetchWakaTimeStats = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: "Basic " + Buffer.from(`${env.WAKATIME_API_KEY}:`).toString("base64"),
      },
      signal: controller.signal,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch wakatime API");
    }

    return result.data;
  } finally {
    clearTimeout(timeout);
  }
};
