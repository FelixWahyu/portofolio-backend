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
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${folder}`,
        resource_type: "raw",
        public_id: originalName.replace(/\.[^/.]+$/, ""),
        format: "pdf",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

export const deletePdf = async (fileUrl) => {
  if (!fileUrl) return;
  try {
    // Expected format: https://res.cloudinary.com/.../raw/upload/v12345/portfolio/resumes/filename.pdf
    const parts = fileUrl.split("/");
    const portfolioIndex = parts.indexOf("portfolio");
    if (portfolioIndex === -1) {
      // Fallback for older local uploads if any
      const urlParts = fileUrl.split("/uploads/");
      if (urlParts.length >= 2) {
        const relativePath = urlParts[1];
        const filePath = path.join(process.cwd(), "uploads", relativePath);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }
      return;
    }

    const folderAndFile = parts.slice(portfolioIndex).join("/");
    // Cloudinary 'raw' resources include the extension in the public_id sometimes, or not.
    // However, usually for raw it's just the exact path.
    const publicId = folderAndFile;

    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch (error) {
    console.error("Failed to delete PDF from Cloudinary:", error);
  }
};
