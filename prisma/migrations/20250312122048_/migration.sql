/*
  Warnings:

  - You are about to drop the column `answer` on the `TaskProgress` table. All the data in the column will be lost.
  - You are about to drop the column `attempt` on the `TaskProgress` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `TaskProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskProgress" DROP COLUMN "answer",
DROP COLUMN "attempt",
DROP COLUMN "score",
ADD COLUMN     "attempts" JSONB;
