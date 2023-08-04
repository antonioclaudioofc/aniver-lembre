/*
  Warnings:

  - You are about to drop the column `avatarBirthday` on the `Birthday` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Birthday" DROP COLUMN "avatarBirthday";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUser";
