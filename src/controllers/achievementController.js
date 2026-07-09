import * as achievementService from "../services/achievementService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const getAllAchievements = async (req, res) => {
  const { search, type, page, limit, adminView } = req.query;
  const isAdmin = req.user && req.user.role === "admin" && adminView === "true";

  try {
    const data = await achievementService.getAllAchievements({
      search,
      type,
      page,
      limit,
      isAdmin,
    });
    return successResponse(res, "Achievements retrieved successfully", data);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve achievements");
  }
};

export const getAchievementById = async (req, res) => {
  const { id } = req.params;

  try {
    const achievement = await achievementService.getAchievementById(id);
    if (!achievement) {
      return errorResponse(res, "Achievement not found", null, 404);
    }
    return successResponse(res, "Achievement retrieved successfully", achievement);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve achievement");
  }
};

export const getAchievementStats = async (req, res) => {
  try {
    const totalAchievements = await achievementService.getAchievementCount();
    return successResponse(res, "Stats retrieved successfully", { totalAchievements });
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve stats");
  }
};

export const getAchievementTypes = async (req, res) => {
  try {
    const types = await achievementService.getAchievementTypes();
    return successResponse(res, "Achievement types retrieved successfully", types);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve achievement types");
  }
};

export const createAchievement = async (req, res) => {
  const { titleId, titleEn, issuerTextId, issuerTextEn } = req.body;

  if (!titleId || !titleEn || !issuerTextId || !issuerTextEn) {
    return errorResponse(res, "Bilingual titles and issuers are required", null, 400);
  }

  if (!req.file) {
    return errorResponse(res, "Achievement image is required", null, 400);
  }

  try {
    const newAchievement = await achievementService.createAchievement(req.body, req.file.buffer);
    return successResponse(res, "Achievement created successfully", newAchievement, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to create achievement", null, 500);
  }
};

export const updateAchievement = async (req, res) => {
  const { id } = req.params;
  const { titleId, titleEn, issuerTextId, issuerTextEn } = req.body;

  if (!titleId || !titleEn || !issuerTextId || !issuerTextEn) {
    return errorResponse(res, "Bilingual titles and issuers are required", null, 400);
  }

  try {
    const updatedAchievement = await achievementService.updateAchievement(
      id,
      req.body,
      req.file ? req.file.buffer : null
    );
    return successResponse(res, "Achievement updated successfully", updatedAchievement);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to update achievement", null, 500);
  }
};

export const deleteAchievement = async (req, res) => {
  const { id } = req.params;

  try {
    await achievementService.deleteAchievement(id);
    return successResponse(res, "Achievement deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message || "Failed to delete achievement", null, 500);
  }
};

export const togglePublishAchievement = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAchievement = await achievementService.togglePublishAchievement(id);
    return successResponse(res, "Achievement publish status toggled successfully", updatedAchievement);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to toggle achievement publish status", null, 500);
  }
};

