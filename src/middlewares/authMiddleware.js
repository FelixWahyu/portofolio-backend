import { verifyToken } from "../services/authService.js";
import { errorResponse } from "../utils/responseHelper.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Authorization token is missing or invalid", null, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, error.message, null, 401);
  }
};

export default authMiddleware;
