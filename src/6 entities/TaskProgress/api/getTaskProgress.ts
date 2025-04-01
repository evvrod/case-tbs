import { TaskProgress } from '@prisma/client';

import { prisma } from '@/7 shared/index';

interface IGetTaskProgressProps {
  userId: string;
  taskId: string;
}

type TaskProgressWithError = {
  error?: { message: string };
  data?: TaskProgress;
};

export async function getTaskProgress(
  props: IGetTaskProgressProps,
): Promise<TaskProgressWithError> {
  const { userId, taskId } = props;
  try {
    const taskProgress = await prisma.taskProgress.findUnique({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
      select: {
        id: true,
        userId: true,
        taskId: true,
        attempt: true,
        status: true,
        attempts: true,
        score: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!taskProgress) {
      return { error: { message: 'Не найдена запись TaskProgress' } };
    }

    return { data: taskProgress };
  } catch {
    return {
      error: { message: 'Произошла ошибка при получении записи TaskProgress' },
    };
  }
}
