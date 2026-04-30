-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'USD',
    "icon" TEXT NOT NULL DEFAULT '$',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);
