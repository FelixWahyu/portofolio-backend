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
    const parts = imageUrl.split("/");
    const portfolioIndex = parts.indexOf("portfolio");
    if (portfolioIndex === -1) return;
    
    const folderAndFile = parts.slice(portfolioIndex).join("/");
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
    const parts = fileUrl.split("/");
    const portfolioIndex = parts.indexOf("portfolio");
    if (portfolioIndex === -1) {
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
    const publicId = folderAndFile;

    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch (error) {
    console.error("Failed to delete PDF from Cloudinary:", error);
  }
};
