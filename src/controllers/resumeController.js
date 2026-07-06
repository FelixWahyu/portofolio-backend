import * as resumeService from "../services/resumeService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const getAllResumes = async (req, res) => {
  const { search, page, limit } = req.query;

  try {
    const data = await resumeService.getAllResumes({ search, page, limit });
    return successResponse(res, "Resumes retrieved successfully", data);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve resumes");
  }
};

export const getResumeById = async (req, res) => {
  const { id } = req.params;

  try {
    const resume = await resumeService.getResumeById(id);
    if (!resume) {
      return errorResponse(res, "Resume not found", null, 404);
    }
    return successResponse(res, "Resume retrieved successfully", resume);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve resume");
  }
};

export const getActiveResume = async (req, res) => {
  try {
    const resume = await resumeService.getActiveResume();
    if (!resume) {
      return errorResponse(res, "No active resume found", null, 404);
    }
    return successResponse(res, "Active resume retrieved successfully", resume);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve active resume");
  }
};

export const getResumeStats = async (req, res) => {
  try {
    const totalResumes = await resumeService.getResumeCount();
    return successResponse(res, "Stats retrieved successfully", { totalResumes });
  } catch (error) {
    return errorResponse(res, error.message || "Failed to retrieve stats");
  }
};

export const createResume = async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    return errorResponse(res, "fileName is required", null, 400);
  }

  if (!req.file) {
    return errorResponse(res, "PDF file is required", null, 400);
  }

  try {
    const data = {
      fileName,
      fileSize: req.file.size,
      isActive: req.body.isActive,
    };
    const newResume = await resumeService.createResume(data, req.file.buffer, req.file.originalname);
    return successResponse(res, "Resume created successfully", newResume, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to create resume", null, 500);
  }
};

export const updateResume = async (req, res) => {
  const { id } = req.params;
  const { fileName } = req.body;

  if (!fileName) {
    return errorResponse(res, "fileName is required", null, 400);
  }

  try {
    const data = {
      fileName,
      fileSize: req.file ? req.file.size : undefined,
    };
    const updatedResume = await resumeService.updateResume(
      id,
      data,
      req.file ? req.file.buffer : undefined,
      req.file ? req.file.originalname : undefined
    );
    return successResponse(res, "Resume updated successfully", updatedResume);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to update resume", null, 500);
  }
};

export const deleteResume = async (req, res) => {
  const { id } = req.params;

  try {
    await resumeService.deleteResume(id);
    return successResponse(res, "Resume deleted successfully");
  } catch (error) {
    const statusCode = error.message === "Cannot delete the active resume" ? 400 : 500;
    return errorResponse(res, error.message || "Failed to delete resume", null, statusCode);
  }
};

export const setActiveResume = async (req, res) => {
  const { id } = req.params;

  try {
    await resumeService.setActiveResume(id);
    return successResponse(res, "Resume activated successfully");
  } catch (error) {
    return errorResponse(res, error.message || "Failed to activate resume", null, 500);
  }
};
