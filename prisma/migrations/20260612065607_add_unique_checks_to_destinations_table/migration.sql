/*
  Warnings:

  - A unique constraint covering the columns `[country,city,slogan]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Destination_country_city_slogan_key" ON "Destination"("country", "city", "slogan");
