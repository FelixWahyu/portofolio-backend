import prisma from "../lib/prisma.js";
import { uploadImage, deleteImage } from "./uploadService.js";

export const getAllAchievements = async ({ search, type, page, limit, isAdmin = false }) => {
  const where = {};

  if (!isAdmin) {
    where.isPublished = true;
  }

  if (type && type !== "All") {
    where.type = {
      equals: type,
      mode: "insensitive",
    };
  }

  if (search) {
    where.OR = [
      { titleId: { contains: search, mode: "insensitive" } },
      { titleEn: { contains: search, mode: "insensitive" } },
      { issuerTextId: { contains: search, mode: "insensitive" } },
      { issuerTextEn: { contains: search, mode: "insensitive" } },
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

  const [achievements, total] = await Promise.all([
    prisma.achievement.findMany({
      where,
      orderBy,
      skip,
      take: parsedLimit,
    }),
    prisma.achievement.count({ where }),
  ]);

  return {
    achievements,
    total,
    page: parsedPage,
    limit: parsedLimit,
    totalPages: Math.ceil(total / parsedLimit),
  };
};

export const getAchievementById = async (id) => {
  return await prisma.achievement.findUnique({
    where: { id },
  });
};

export const getAchievementCount = async () => {
  return await prisma.achievement.count();
};

export const getAchievementTypes = async () => {
  const distinctTypes = await prisma.achievement.findMany({
    select: {
      type: true,
    },
    distinct: ["type"],
  });

  return distinctTypes.map((item) => item.type).filter(Boolean);
};

export const createAchievement = async (data, imageBuffer) => {
  let imageUrl = "";

  if (imageBuffer) {
    imageUrl = await uploadImage(imageBuffer, "achievements");
  } else {
    throw new Error("Achievement image is required");
  }

  const tagsId = typeof data.tagsId === "string" ? JSON.parse(data.tagsId) : (data.tagsId || []);
  const tagsEn = typeof data.tagsEn === "string" ? JSON.parse(data.tagsEn) : (data.tagsEn || []);
  const sortOrder = parseInt(data.sortOrder, 10) || 0;
  const isPublished = data.isPublished === "true" || data.isPublished === true;

  return await prisma.achievement.create({
    data: {
      titleId: data.titleId,
      titleEn: data.titleEn,
      issuerTextId: data.issuerTextId,
      issuerTextEn: data.issuerTextEn,
      descriptionId: data.descriptionId || null,
      descriptionEn: data.descriptionEn || null,
      tagsId,
      tagsEn,
      dateId: data.dateId,
      dateEn: data.dateEn,
      image: imageUrl,
      type: data.type || "Profesional",
      credentialCode: data.credentialCode || null,
      sortOrder,
      isPublished,
    },
  });
};

export const updateAchievement = async (id, data, imageBuffer) => {
  const existingAchievement = await prisma.achievement.findUnique({
    where: { id },
  });

  if (!existingAchievement) {
    throw new Error("Achievement not found");
  }

  let imageUrl = existingAchievement.image;

  if (imageBuffer) {
    imageUrl = await uploadImage(imageBuffer, "achievements");
    
    if (existingAchievement.image && existingAchievement.image.includes("cloudinary.com")) {
      await deleteImage(existingAchievement.image);
    }
  }

  const tagsId = typeof data.tagsId === "string" ? JSON.parse(data.tagsId) : (data.tagsId || []);
  const tagsEn = typeof data.tagsEn === "string" ? JSON.parse(data.tagsEn) : (data.tagsEn || []);
  const sortOrder = parseInt(data.sortOrder, 10) || 0;
  const isPublished = data.isPublished === "true" || data.isPublished === true;

  return await prisma.achievement.update({
    where: { id },
    data: {
      titleId: data.titleId,
      titleEn: data.titleEn,
      issuerTextId: data.issuerTextId,
      issuerTextEn: data.issuerTextEn,
      descriptionId: data.descriptionId || null,
      descriptionEn: data.descriptionEn || null,
      tagsId,
      tagsEn,
      dateId: data.dateId,
      dateEn: data.dateEn,
      image: imageUrl,
      type: data.type || "Profesional",
      credentialCode: data.credentialCode || null,
      sortOrder,
      isPublished,
    },
  });
};

export const deleteAchievement = async (id) => {
  const existingAchievement = await prisma.achievement.findUnique({
    where: { id },
  });

  if (!existingAchievement) {
    throw new Error("Achievement not found");
  }

  if (existingAchievement.image && existingAchievement.image.includes("cloudinary.com")) {
    await deleteImage(existingAchievement.image);
  }

  return await prisma.achievement.delete({
    where: { id },
  });
};

export const togglePublishAchievement = async (id) => {
  const existingAchievement = await prisma.achievement.findUnique({
    where: { id },
  });

  if (!existingAchievement) {
    throw new Error("Achievement not found");
  }

  return await prisma.achievement.update({
    where: { id },
    data: {
      isPublished: !existingAchievement.isPublished,
    },
  });
};

