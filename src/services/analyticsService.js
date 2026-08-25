import { env } from "../config/env.js";

const BASE_URL = "https://api.vercel.com/v1/query/web-analytics/visits/aggregate";

const fetchVercelData = async (since, until, queryParams = {}) => {
  if (!env.VERCEL_API_TOKEN || !env.VERCEL_PROJECT_ID) {
    throw new Error("Vercel API Token or Project ID is not configured");
  }

  const params = new URLSearchParams({
    projectId: env.VERCEL_PROJECT_ID,
    since,
    until,
    ...queryParams,
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Vercel API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

const getPeriodDates = (period) => {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "7d":
      start.setDate(end.getDate() - 7);
      break;
    case "14d":
      start.setDate(end.getDate() - 14);
      break;
    case "30d":
      start.setDate(end.getDate() - 30);
      break;
    default:
      start.setDate(end.getDate() - 7);
  }

  return {
    since: start.toISOString(),
    until: end.toISOString(),
  };
};

export const getPageviews = async (period = "7d") => {
  const { since, until } = getPeriodDates(period);
  const data = await fetchVercelData(since, until, { by: "day" });
  return data;
};

export const getReferrers = async (period = "30d", limit = 10) => {
  const { since, until } = getPeriodDates(period);
  const data = await fetchVercelData(since, until, { by: "referrerHostname", limit });
  return data;
};

export const getDevices = async (period = "30d") => {
  const { since, until } = getPeriodDates(period);
  // Fetch device types
  const deviceData = await fetchVercelData(since, until, { by: "deviceType" });
  // Fetch browsers
  const browserData = await fetchVercelData(since, until, { by: "browserName" });

  return {
    devices: deviceData,
    browsers: browserData,
  };
};
