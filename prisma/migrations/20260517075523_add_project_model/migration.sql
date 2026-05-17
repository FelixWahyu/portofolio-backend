-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "role_en" TEXT NOT NULL,
    "problem_id" TEXT NOT NULL,
    "problem_en" TEXT NOT NULL,
    "impact_id" TEXT NOT NULL,
    "impact_en" TEXT NOT NULL,
    "features_id" TEXT[],
    "features_en" TEXT[],
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Web',
    "tech" TEXT[],
    "demo_link" TEXT,
    "source_link" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
