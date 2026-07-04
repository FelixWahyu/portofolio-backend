import prisma from "../lib/prisma.js";

const parseArray = (field) => {
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch (e) {
      return [];
    }
  }
  return field || [];
};

export const getAllExperiences = async ({ search, page, limit, isAdmin = false }) => {
  const where = {};

  // If not admin, only show published experiences
  if (!isAdmin) {
    where.isPublished = true;
  }

  // Search filter (searches in roleId, roleEn, companyId, companyEn)
  if (search) {
    where.OR = [
      { roleId: { contains: search, mode: "insensitive" } },
      { roleEn: { contains: search, mode: "insensitive" } },
      { companyId: { contains: search, mode: "insensitive" } },
      { companyEn: { contains: search, mode: "insensitive" } },
    ];
  }

  // Default sorting: sortOrder ascending, then createdAt descending
  const orderBy = [
    { sortOrder: "asc" },
    { createdAt: "desc" },
  ];

  // Pagination calculation
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const [experiences, total] = await Promise.all([
    prisma.experience.findMany({
      where,
      orderBy,
      skip,
      take: parsedLimit,
    }),
    prisma.experience.count({ where }),
  ]);

  return {
    experiences,
    total,
    page: parsedPage,
    limit: parsedLimit,
    totalPages: Math.ceil(total / parsedLimit),
  };
};

export const getExperienceById = async (id) => {
  return await prisma.experience.findUnique({
    where: { id },
  });
};

export const getExperienceCount = async () => {
  return await prisma.experience.count();
};

export const createExperience = async (data) => {
  const sortOrder = parseInt(data.sortOrder, 10) || 0;
  const isPublished = data.isPublished === "true" || data.isPublished === true;

  return await prisma.experience.create({
    data: {
      roleId: data.roleId,
      roleEn: data.roleEn,
      companyId: data.companyId,
      companyEn: data.companyEn,
      locationId: data.locationId,
      locationEn: data.locationEn,
      periodId: data.periodId,
      periodEn: data.periodEn,
      durationId: data.durationId,
      durationEn: data.durationEn,
      typeId: data.typeId,
      typeEn: data.typeEn,
      modeId: data.modeId,
      modeEn: data.modeEn,
      responsibilitiesId: parseArray(data.responsibilitiesId),
      responsibilitiesEn: parseArray(data.responsibilitiesEn),
      insightId: parseArray(data.insightId),
      insightEn: parseArray(data.insightEn),
      impactId: parseArray(data.impactId),
      impactEn: parseArray(data.impactEn),
      sortOrder,
      isPublished,
    },
  });
};

export const updateExperience = async (id, data) => {
  const existingExperience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!existingExperience) {
    throw new Error("Experience not found");
  }

  const sortOrder = parseInt(data.sortOrder, 10) || 0;
  const isPublished = data.isPublished === "true" || data.isPublished === true;

  return await prisma.experience.update({
    where: { id },
    data: {
      roleId: data.roleId,
      roleEn: data.roleEn,
      companyId: data.companyId,
      companyEn: data.companyEn,
      locationId: data.locationId,
      locationEn: data.locationEn,
      periodId: data.periodId,
      periodEn: data.periodEn,
      durationId: data.durationId,
      durationEn: data.durationEn,
      typeId: data.typeId,
      typeEn: data.typeEn,
      modeId: data.modeId,
      modeEn: data.modeEn,
      responsibilitiesId: parseArray(data.responsibilitiesId),
      responsibilitiesEn: parseArray(data.responsibilitiesEn),
      insightId: parseArray(data.insightId),
      insightEn: parseArray(data.insightEn),
      impactId: parseArray(data.impactId),
      impactEn: parseArray(data.impactEn),
      sortOrder,
      isPublished,
    },
  });
};

export const deleteExperience = async (id) => {
  const existingExperience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!existingExperience) {
    throw new Error("Experience not found");
  }

  return await prisma.experience.delete({
    where: { id },
  });
};
