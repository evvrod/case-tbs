/*
  Warnings:

  - The `attempts` column on the `TaskProgress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TaskProgress" DROP COLUMN "attempts",
ADD COLUMN     "attempts" JSONB[];
