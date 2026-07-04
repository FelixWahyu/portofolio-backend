import * as experienceService from "../services/experienceService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const getAllExperiences = async (req, res) => {
  const { search, page, limit } = req.query;
  const isAdmin = req.user && req.user.role === "admin";

  try {
    const data = await experienceService.getAllExperiences({
      search,
      page,
      limit,
      isAdmin,
    });
    return successResponse(res, "Experiences retrieved successfully", data);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve experiences");
  }
};

export const getExperienceById = async (req, res) => {
  const { id } = req.params;

  try {
    const experience = await experienceService.getExperienceById(id);
    if (!experience) {
      return errorResponse(res, "Experience not found", null, 404);
    }
    return successResponse(res, "Experience retrieved successfully", experience);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve experience");
  }
};

export const getExperienceStats = async (req, res) => {
  try {
    const totalExperiences = await experienceService.getExperienceCount();
    return successResponse(res, "Stats retrieved successfully", { totalExperiences });
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve stats");
  }
};

export const createExperience = async (req, res) => {
  const { roleId, roleEn, companyId, companyEn } = req.body;

  if (!roleId || !roleEn || !companyId || !companyEn) {
    return errorResponse(res, "Bilingual roles and companies are required", null, 400);
  }

  try {
    const newExperience = await experienceService.createExperience(req.body);
    return successResponse(res, "Experience created successfully", newExperience, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to create experience", null, 500);
  }
};

export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { roleId, roleEn, companyId, companyEn } = req.body;

  if (!roleId || !roleEn || !companyId || !companyEn) {
    return errorResponse(res, "Bilingual roles and companies are required", null, 400);
  }

  try {
    const updatedExperience = await experienceService.updateExperience(id, req.body);
    return successResponse(res, "Experience updated successfully", updatedExperience);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to update experience", null, 500);
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  try {
    await experienceService.deleteExperience(id);
    return successResponse(res, "Experience deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message || "Failed to delete experience", null, 500);
  }
};
