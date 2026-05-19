-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "issuer_text_id" TEXT NOT NULL,
    "issuer_text_en" TEXT NOT NULL,
    "description_id" TEXT,
    "description_en" TEXT,
    "tags_id" TEXT[],
    "tags_en" TEXT[],
    "date_id" TEXT NOT NULL,
    "date_en" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Profesional',
    "credential_code" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);
