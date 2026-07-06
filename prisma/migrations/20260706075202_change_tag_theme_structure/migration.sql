/*
  Warnings:

  - You are about to drop the column `theme` on the `AccommodationTag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,emoji,textColor,borderColor,backgroundColor]` on the table `AccommodationTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `backgroundColor` to the `AccommodationTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `borderColor` to the `AccommodationTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `AccommodationTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AccommodationTag_title_emoji_theme_key";

-- AlterTable
ALTER TABLE "AccommodationTag" DROP COLUMN "theme",
ADD COLUMN     "backgroundColor" TEXT NOT NULL,
ADD COLUMN     "borderColor" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccommodationTag_title_emoji_textColor_borderColor_backgrou_key" ON "AccommodationTag"("title", "emoji", "textColor", "borderColor", "backgroundColor");
