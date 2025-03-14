/*
  Warnings:

  - You are about to drop the column `completedAt` on the `TaskProgress` table. All the data in the column will be lost.
  - Added the required column `attempt` to the `TaskProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskProgress" DROP COLUMN "completedAt",
ADD COLUMN     "attempt" INTEGER NOT NULL;
