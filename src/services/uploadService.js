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
