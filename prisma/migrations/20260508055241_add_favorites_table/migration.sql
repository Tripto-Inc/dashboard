/*
  Warnings:

  - You are about to drop the column `type` on the `Accommodation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Accommodation_createdById_idx";

-- DropIndex
DROP INDEX "Accommodation_title_key";

-- DropIndex
DROP INDEX "Accommodation_type_idx";

-- DropIndex
DROP INDEX "Accommodation_updatedById_idx";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "type",
ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ActivityType" ALTER COLUMN "isActive" DROP DEFAULT,
ALTER COLUMN "icon" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Currency" ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "symbol" DROP DEFAULT,
ALTER COLUMN "isActive" DROP DEFAULT,
ALTER COLUMN "isoCode" DROP DEFAULT;

-- DropEnum
DROP TYPE "AccommodationType";

-- CreateTable
CREATE TABLE "FavoriteAccommodation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteAccommodation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FavoriteAccommodation_userId_idx" ON "FavoriteAccommodation"("userId");

-- CreateIndex
CREATE INDEX "FavoriteAccommodation_accommodationId_idx" ON "FavoriteAccommodation"("accommodationId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAccommodation_userId_accommodationId_key" ON "FavoriteAccommodation"("userId", "accommodationId");

-- AddForeignKey
ALTER TABLE "FavoriteAccommodation" ADD CONSTRAINT "FavoriteAccommodation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAccommodation" ADD CONSTRAINT "FavoriteAccommodation_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
