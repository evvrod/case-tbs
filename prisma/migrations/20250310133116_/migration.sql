/*
  Warnings:

  - Added the required column `title` to the `VideoQuestionTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoQuestionTask" ADD COLUMN     "title" TEXT NOT NULL;
