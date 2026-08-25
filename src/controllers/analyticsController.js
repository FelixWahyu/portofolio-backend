import * as analyticsService from "../services/analyticsService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const getPageviewsHandler = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await analyticsService.getPageviews(period);
    return successResponse(res, "Pageviews fetched successfully", data);
  } catch (error) {
    console.error("Error fetching pageviews:", error);
    return errorResponse(res, "Failed to fetch pageviews", error.message);
  }
};

export const getReferrersHandler = async (req, res) => {
  try {
    const { period, limit } = req.query;
    const data = await analyticsService.getReferrers(period, limit ? parseInt(limit) : undefined);
    return successResponse(res, "Referrers fetched successfully", data);
  } catch (error) {
    console.error("Error fetching referrers:", error);
    return errorResponse(res, "Failed to fetch referrers", error.message);
  }
};

export const getDevicesHandler = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await analyticsService.getDevices(period);
    return successResponse(res, "Devices fetched successfully", data);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return errorResponse(res, "Failed to fetch devices", error.message);
  }
};
