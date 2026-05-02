-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('HOUSE', 'HOTEL');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'AUTUMN', 'WINTER');

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "season" "Season" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addressId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "currencyId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "activityTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'United States Dollar',
    "isoCode" TEXT NOT NULL DEFAULT 'USD',
    "symbol" TEXT NOT NULL DEFAULT '$',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'IconQuestionMark',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "type" "ListingType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "destinationId" TEXT,
    "amenities" JSONB NOT NULL,
    "policies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseListing" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "capacity" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "currencyId" TEXT NOT NULL,
    "availableDates" JSONB,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "HouseListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelListing" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "HotelListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "capacity" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,
    "beds" JSONB NOT NULL,
    "hotelId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Destination_season_idx" ON "Destination"("season");

-- CreateIndex
CREATE INDEX "Destination_isActive_idx" ON "Destination"("isActive");

-- CreateIndex
CREATE INDEX "Destination_addressId_idx" ON "Destination"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_title_key" ON "Activity"("title");

-- CreateIndex
CREATE INDEX "Activity_isActive_idx" ON "Activity"("isActive");

-- CreateIndex
CREATE INDEX "Activity_activityTypeId_idx" ON "Activity"("activityTypeId");

-- CreateIndex
CREATE INDEX "Activity_currencyId_idx" ON "Activity"("currencyId");

-- CreateIndex
CREATE INDEX "Activity_addressId_idx" ON "Activity"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_title_activityTypeId_key" ON "Activity"("title", "activityTypeId");

-- CreateIndex
CREATE INDEX "Address_countryCode_idx" ON "Address"("countryCode");

-- CreateIndex
CREATE INDEX "Address_city_idx" ON "Address"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Address_countryCode_city_details_key" ON "Address"("countryCode", "city", "details");

-- CreateIndex
CREATE INDEX "Currency_title_idx" ON "Currency"("title");

-- CreateIndex
CREATE INDEX "Currency_isActive_idx" ON "Currency"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_title_isoCode_key" ON "Currency"("title", "isoCode");

-- CreateIndex
CREATE INDEX "ActivityType_name_idx" ON "ActivityType"("name");

-- CreateIndex
CREATE INDEX "ActivityType_isActive_idx" ON "ActivityType"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType_name_title_key" ON "ActivityType"("name", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_title_key" ON "Listing"("title");

-- CreateIndex
CREATE INDEX "Listing_type_idx" ON "Listing"("type");

-- CreateIndex
CREATE INDEX "Listing_addressId_idx" ON "Listing"("addressId");

-- CreateIndex
CREATE INDEX "Listing_destinationId_idx" ON "Listing"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_title_addressId_key" ON "Listing"("title", "addressId");

-- CreateIndex
CREATE UNIQUE INDEX "HouseListing_listingId_key" ON "HouseListing"("listingId");

-- CreateIndex
CREATE INDEX "HouseListing_currencyId_idx" ON "HouseListing"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "HotelListing_listingId_key" ON "HotelListing"("listingId");

-- CreateIndex
CREATE INDEX "Room_hotelId_idx" ON "Room"("hotelId");

-- CreateIndex
CREATE INDEX "Room_currencyId_idx" ON "Room"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_hotelId_title_key" ON "Room"("hotelId", "title");

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseListing" ADD CONSTRAINT "HouseListing_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseListing" ADD CONSTRAINT "HouseListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelListing" ADD CONSTRAINT "HotelListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "HotelListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
