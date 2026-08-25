import prisma from "../lib/prisma.js";
import { uploadImage, deleteImage } from "./uploadService.js";

export const getAllProjects = async ({ search, category, page, limit, isAdmin = false }) => {
  const where = {};

  if (!isAdmin) {
    where.isPublished = true;
  }

  if (category && category !== "All") {
    where.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (search) {
    where.OR = [
      { titleId: { contains: search, mode: "insensitive" } },
      { titleEn: { contains: search, mode: "insensitive" } },
      { descriptionId: { contains: search, mode: "insensitive" } },
      { descriptionEn: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy = [
    { sortOrder: "asc" },
    { createdAt: "desc" },
  ];

  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy,
      skip,
      take: parsedLimit,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    projects,
    total,
    page: parsedPage,
    limit: parsedLimit,
    totalPages: Math.ceil(total / parsedLimit),
  };
};

export const getProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: { id },
  });
};

export const getProjectCount = async () => {
  return await prisma.project.count();
};

export const createProject = async (data, imageBuffer) => {
  let imageUrl = "";

  if (imageBuffer) {
    imageUrl = await uploadImage(imageBuffer);
  } else {
    throw new Error("Project image is required");
  }

  const tech = typeof data.tech === "string" ? JSON.parse(data.tech) : (data.tech || []);
  const featuresId = typeof data.featuresId === "string" ? JSON.parse(data.featuresId) : (data.featuresId || []);
  const featuresEn = typeof data.featuresEn === "string" ? JSON.parse(data.featuresEn) : (data.featuresEn || []);
  const sortOrder = parseInt(data.sortOrder, 10) || 0;
  const isPublished = data.isPublished === "true" || data.isPublished === true;

  return await prisma.project.create({
    data: {
      titleId: data.titleId,
      titleEn: data.titleEn,
      descriptionId: data.descriptionId,
      descriptionEn: data.descriptionEn,
      roleId: data.roleId,
      roleEn: data.roleEn,
      problemId: data.problemId,
      problemEn: data.problemEn,
      impactId: data.impactId,
      impactEn: data.impactEn,
      featuresId,
      featuresEn,
      image: imageUrl,
      category: data.category || "Web",
      tech,
      demolink: data.demolink || null,
      sourcelink: data.sourcelink || null,
      sortOrder,
      isPublished,
    },
  });
};

export const updateProject = async (id, data, imageBuffer) => {
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  let imageUrl = existingProject.image;

  if (imageBuffer) {
    imageUrl = await uploadImage(imageBuffer);
    
    if (existingProject.image && existingProject.image.includes("cloudinary.com")) {
      await deleteImage(existingProject.image);
    }
  }

  const tech = typeof data.tech === "string" ? JSON.parse(data.tech) : (data.tech || []);
  const featuresId = typeof data.featuresId === "string" ? JSON.parse(data.featuresId) : (data.featuresId || []);
  const featuresEn = typeof data.featuresEn === "string" ? JSON.parse(data.featuresEn) : (data.featuresEn || []);
  const sortOrder = parseInt(data.sortOrder, 10) || 0;
  const isPublished = data.isPublished === "true" || data.isPublished === true;

  return await prisma.project.update({
    where: { id },
    data: {
      titleId: data.titleId,
      titleEn: data.titleEn,
      descriptionId: data.descriptionId,
      descriptionEn: data.descriptionEn,
      roleId: data.roleId,
      roleEn: data.roleEn,
      problemId: data.problemId,
      problemEn: data.problemEn,
      impactId: data.impactId,
      impactEn: data.impactEn,
      featuresId,
      featuresEn,
      image: imageUrl,
      category: data.category || "Web",
      tech,
      demolink: data.demolink || null,
      sourcelink: data.sourcelink || null,
      sortOrder,
      isPublished,
    },
  });
};

export const deleteProject = async (id) => {
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  if (existingProject.image && existingProject.image.includes("cloudinary.com")) {
    await deleteImage(existingProject.image);
  }

  return await prisma.project.delete({
    where: { id },
  });
};

export const togglePublishProject = async (id) => {
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  return await prisma.project.update({
    where: { id },
    data: {
      isPublished: !existingProject.isPublished,
    },
  });
};

