import prisma from "../lib/prisma.js";
import { uploadPdf, deletePdf } from "./uploadService.js";

export const getAllResumes = async ({ search, page, limit }) => {
  const where = {};

  if (search) {
    where.fileName = {
      contains: search,
      mode: "insensitive",
    };
  }

  const orderBy = [
    { isActive: "desc" },
    { createdAt: "desc" },
  ];

  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const [resumes, total] = await Promise.all([
    prisma.resume.findMany({
      where,
      orderBy,
      skip,
      take: parsedLimit,
    }),
    prisma.resume.count({ where }),
  ]);

  return {
    resumes,
    total,
    page: parsedPage,
    limit: parsedLimit,
    totalPages: Math.ceil(total / parsedLimit),
  };
};

export const getResumeById = async (id) => {
  return await prisma.resume.findUnique({
    where: { id },
  });
};

export const getActiveResume = async () => {
  return await prisma.resume.findFirst({
    where: { isActive: true },
  });
};

export const getResumeCount = async () => {
  return await prisma.resume.count();
};

export const createResume = async (data, fileBuffer, originalName) => {
  let fileUrl = "";

  if (fileBuffer) {
    fileUrl = await uploadPdf(fileBuffer, originalName);
  } else {
    throw new Error("Resume PDF file is required");
  }

  const fileSize = data.fileSize ? parseInt(data.fileSize, 10) : 0;

  return await prisma.resume.create({
    data: {
      fileName: data.fileName,
      fileUrl,
      fileSize,
      isActive: data.isActive === "true" || data.isActive === true,
    },
  });
};

export const updateResume = async (id, data, fileBuffer, originalName) => {
  const existingResume = await prisma.resume.findUnique({
    where: { id },
  });

  if (!existingResume) {
    throw new Error("Resume not found");
  }

  let fileUrl = existingResume.fileUrl;
  let fileSize = existingResume.fileSize;

  if (fileBuffer) {
    fileUrl = await uploadPdf(fileBuffer, originalName);
    fileSize = data.fileSize ? parseInt(data.fileSize, 10) : 0;

    if (existingResume.fileUrl && existingResume.fileUrl.includes("cloudinary.com")) {
      await deletePdf(existingResume.fileUrl);
    }
  }

  return await prisma.resume.update({
    where: { id },
    data: {
      fileName: data.fileName || existingResume.fileName,
      fileUrl,
      fileSize,
    },
  });
};

export const deleteResume = async (id) => {
  const existingResume = await prisma.resume.findUnique({
    where: { id },
  });

  if (!existingResume) {
    throw new Error("Resume not found");
  }

  if (existingResume.isActive) {
    throw new Error("Cannot delete the active resume");
  }

  if (existingResume.fileUrl && existingResume.fileUrl.includes("cloudinary.com")) {
    await deletePdf(existingResume.fileUrl);
  }

  return await prisma.resume.delete({
    where: { id },
  });
};

export const setActiveResume = async (id) => {
  const existingResume = await prisma.resume.findUnique({
    where: { id },
  });

  if (!existingResume) {
    throw new Error("Resume not found");
  }

  return await prisma.$transaction([
    prisma.resume.updateMany({
      data: { isActive: false },
    }),
    prisma.resume.update({
      where: { id },
      data: { isActive: true },
    }),
  ]);
};
