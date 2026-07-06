import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (fileBuffer, folder = "projects") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: `portfolio/${folder}`, format: "webp", quality: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;
  try {
    // Standard Cloudinary URL structure: https://res.cloudinary.com/.../image/upload/v12345/portfolio/projects/publicId.webp
    // We want to extract 'portfolio/projects/publicId'
    const parts = imageUrl.split("/");
    const portfolioIndex = parts.indexOf("portfolio");
    if (portfolioIndex === -1) return; // Not a Cloudinary image or different directory structure
    
    const folderAndFile = parts.slice(portfolioIndex).join("/");
    // Remove the file extension (e.g. .webp, .jpg)
    const publicId = folderAndFile.replace(/\.[^/.]+$/, "");
    
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};

export const uploadPdf = async (fileBuffer, originalName, folder = "resumes") => {
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Create a unique filename to prevent collisions
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const uniqueName = `${baseName}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  await fs.promises.writeFile(filePath, fileBuffer);

  // Return the URL path
  const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`;
  return `${baseUrl}/uploads/${folder}/${uniqueName}`;
};

export const deletePdf = async (fileUrl) => {
  if (!fileUrl) return;
  try {
    // Expected format: http://localhost:3000/uploads/resumes/filename.pdf
    const urlParts = fileUrl.split("/uploads/");
    if (urlParts.length < 2) return;

    const relativePath = urlParts[1];
    const filePath = path.join(process.cwd(), "uploads", relativePath);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (error) {
    console.error("Failed to delete PDF locally:", error);
  }
};

