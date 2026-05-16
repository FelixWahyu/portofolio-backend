import * as authService from "../services/authService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, "Email and password are required", null, 400);
  }

  try {
    const data = await authService.login(email, password);
    return successResponse(res, "Login successful", data);
  } catch (error) {
    return errorResponse(res, error.message, null, 401);
  }
};

export const logout = async (req, res) => {
  // In stateless JWT, logout is primarily handled by client side (deleting the token)
  // We can return a success response to acknowledge the action
  return successResponse(res, "Logged out successfully");
};

export const me = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.userId);
    if (!user) {
      return errorResponse(res, "User not found", null, 404);
    }
    return successResponse(res, "User profile retrieved", user);
  } catch (error) {
    return errorResponse(res, "Failed to retrieve user profile");
  }
};

export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.userId;

  try {
    const updatedUser = await authService.updateProfile(userId, { name, email, password });
    return successResponse(res, "Profile updated successfully", updatedUser);
  } catch (error) {
    return errorResponse(res, error.message, null, 400);
  }
};
