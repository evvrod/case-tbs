import { Prisma } from '@prisma/client';

import { prisma } from '@/7 shared/index';

type TaskWithError = {
  error?: { message: string };
  data?: TaskWithRelations;
};

export async function getTask(taskId: string): Promise<TaskWithError> {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        videoQuestion: true,
        dragAndDrop: true,
      },
    });

    if (!task) return { error: { message: 'Задание Task не найдено' } };

    return { data: task };
  } catch {
    return {
      error: { message: 'Произошла ошибка при получении данных задания Task' },
    };
  }
}

export type TaskWithRelations = Prisma.TaskGetPayload<{
  select: {
    id: true;
    type: true;
    attempts: true;
    score: true;
    createdAt: true;
    updatedAt: true;
  };
  include: {
    videoQuestion: true;
    dragAndDrop: true;
  };
}>;
