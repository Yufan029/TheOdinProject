/*
  Warnings:

  - Added the required column `publicId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."File" ADD COLUMN     "publicId" TEXT NOT NULL;
