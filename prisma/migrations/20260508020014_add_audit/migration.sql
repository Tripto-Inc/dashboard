/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelListing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HouseListing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Listing` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('HOUSE', 'HOTEL');

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "HotelListing" DROP CONSTRAINT "HotelListing_listingId_fkey";

-- DropForeignKey
ALTER TABLE "HouseListing" DROP CONSTRAINT "HouseListing_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "HouseListing" DROP CONSTRAINT "HouseListing_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotelId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ActivityType" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "HotelListing";

-- DropTable
DROP TABLE "HouseListing";

-- DropTable
DROP TABLE "Listing";

-- DropEnum
DROP TYPE "ListingType";

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "type" "AccommodationType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "destinationId" TEXT,
    "amenities" JSONB NOT NULL,
    "policies" JSONB NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "capacity" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL,
    "availableDates" JSONB,
    "currencyId" TEXT NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_title_key" ON "Accommodation"("title");

-- CreateIndex
CREATE INDEX "Accommodation_type_idx" ON "Accommodation"("type");

-- CreateIndex
CREATE INDEX "Accommodation_addressId_idx" ON "Accommodation"("addressId");

-- CreateIndex
CREATE INDEX "Accommodation_destinationId_idx" ON "Accommodation"("destinationId");

-- CreateIndex
CREATE INDEX "Accommodation_createdById_idx" ON "Accommodation"("createdById");

-- CreateIndex
CREATE INDEX "Accommodation_updatedById_idx" ON "Accommodation"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_title_addressId_key" ON "Accommodation"("title", "addressId");

-- CreateIndex
CREATE UNIQUE INDEX "House_accommodationId_key" ON "House"("accommodationId");

-- CreateIndex
CREATE INDEX "House_currencyId_idx" ON "House"("currencyId");

-- CreateIndex
CREATE INDEX "House_createdById_idx" ON "House"("createdById");

-- CreateIndex
CREATE INDEX "House_updatedById_idx" ON "House"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_accommodationId_key" ON "Hotel"("accommodationId");

-- CreateIndex
CREATE INDEX "Hotel_createdById_idx" ON "Hotel"("createdById");

-- CreateIndex
CREATE INDEX "Hotel_updatedById_idx" ON "Hotel"("updatedById");

-- CreateIndex
CREATE INDEX "Activity_createdById_idx" ON "Activity"("createdById");

-- CreateIndex
CREATE INDEX "Activity_updatedById_idx" ON "Activity"("updatedById");

-- CreateIndex
CREATE INDEX "ActivityType_createdById_idx" ON "ActivityType"("createdById");

-- CreateIndex
CREATE INDEX "ActivityType_updatedById_idx" ON "ActivityType"("updatedById");

-- CreateIndex
CREATE INDEX "Address_createdById_idx" ON "Address"("createdById");

-- CreateIndex
CREATE INDEX "Address_updatedById_idx" ON "Address"("updatedById");

-- CreateIndex
CREATE INDEX "Currency_createdById_idx" ON "Currency"("createdById");

-- CreateIndex
CREATE INDEX "Currency_updatedById_idx" ON "Currency"("updatedById");

-- CreateIndex
CREATE INDEX "Destination_createdById_idx" ON "Destination"("createdById");

-- CreateIndex
CREATE INDEX "Destination_updatedById_idx" ON "Destination"("updatedById");

-- CreateIndex
CREATE INDEX "Room_createdById_idx" ON "Room"("createdById");

-- CreateIndex
CREATE INDEX "Room_updatedById_idx" ON "Room"("updatedById");

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityType" ADD CONSTRAINT "ActivityType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityType" ADD CONSTRAINT "ActivityType_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
