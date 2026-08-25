import * as projectService from "../services/projectService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const getAllProjects = async (req, res) => {
  const { search, category, page, limit, adminView } = req.query;
  const isAdmin = req.user && req.user.role === "admin" && adminView === "true";

  try {
    const data = await projectService.getAllProjects({
      search,
      category,
      page,
      limit,
      isAdmin,
    });
    return successResponse(res, "Projects retrieved successfully", data);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve projects");
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectService.getProjectById(id);
    if (!project) {
      return errorResponse(res, "Project not found", null, 404);
    }
    return successResponse(res, "Project retrieved successfully", project);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve project");
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await projectService.getProjectCount();
    return successResponse(res, "Stats retrieved successfully", { totalProjects });
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve stats");
  }
};

export const createProject = async (req, res) => {
  const { titleId, titleEn, descriptionId, descriptionEn, roleId, roleEn, problemId, problemEn, impactId, impactEn } = req.body;

  if (!titleId || !titleEn || !descriptionId || !descriptionEn) {
    return errorResponse(res, "Bilingual titles and descriptions are required", null, 400);
  }

  if (!req.file) {
    return errorResponse(res, "Project image is required", null, 400);
  }

  try {
    const newProject = await projectService.createProject(req.body, req.file.buffer);
    return successResponse(res, "Project created successfully", newProject, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to create project", null, 500);
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { titleId, titleEn, descriptionId, descriptionEn } = req.body;

  if (!titleId || !titleEn || !descriptionId || !descriptionEn) {
    return errorResponse(res, "Bilingual titles and descriptions are required", null, 400);
  }

  try {
    const updatedProject = await projectService.updateProject(
      id,
      req.body,
      req.file ? req.file.buffer : null
    );
    return successResponse(res, "Project updated successfully", updatedProject);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to update project", null, 500);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await projectService.deleteProject(id);
    return successResponse(res, "Project deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message || "Failed to delete project", null, 500);
  }
};

export const togglePublishProject = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProject = await projectService.togglePublishProject(id);
    return successResponse(res, "Project publish status toggled successfully", updatedProject);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to toggle project publish status", null, 500);
  }
};

