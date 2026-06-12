/*
  Warnings:

  - You are about to drop the column `addressId` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Destination` table. All the data in the column will be lost.
  - Added the required column `city` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slogan` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_addressId_fkey";

-- DropIndex
DROP INDEX "Destination_addressId_idx";

-- DropIndex
DROP INDEX "Destination_createdById_idx";

-- DropIndex
DROP INDEX "Destination_season_idx";

-- DropIndex
DROP INDEX "Destination_updatedById_idx";

-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "addressId",
DROP COLUMN "description",
DROP COLUMN "season",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "seasons" "Season"[],
ADD COLUMN     "slogan" TEXT NOT NULL;
