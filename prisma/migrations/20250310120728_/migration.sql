/*
  Warnings:

  - The primary key for the `Slide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `currentSlideId` column on the `UserProgress` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `Slide` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `attempts` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_currentSlideId_fkey";

-- AlterTable
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Slide_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "attempts" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "currentSlideId",
ADD COLUMN     "currentSlideId" INTEGER;

-- CreateTable
CREATE TABLE "DAndDTask" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correctOption" INTEGER NOT NULL,

    CONSTRAINT "DAndDTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DAndDTask_taskId_key" ON "DAndDTask"("taskId");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_currentSlideId_fkey" FOREIGN KEY ("currentSlideId") REFERENCES "Slide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DAndDTask" ADD CONSTRAINT "DAndDTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
