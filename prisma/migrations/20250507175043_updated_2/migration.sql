/*
  Warnings:

  - You are about to drop the column `img` on the `doctors` table. All the data in the column will be lost.
  - Added the required column `img` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "img";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "img" TEXT NOT NULL;
