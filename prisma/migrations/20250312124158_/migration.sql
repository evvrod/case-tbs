/*
  Warnings:

  - A unique constraint covering the columns `[userId,taskId]` on the table `TaskProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_userId_taskId_key" ON "TaskProgress"("userId", "taskId");
