import { TaskProgress } from '@prisma/client';

import { TaskStatus } from '@prisma/client';

import { prisma } from '@/7 shared/index';

interface IGetTaskProgressProps {
  userId: string;
  taskId: string;
  taskStatus: TaskStatus;
  taskScore: number;
  taskAttempt: number;
  taskAttempts: {
    score: number;
    answer: number;
    isCorrect: boolean;
  };
}

type TaskProgressWithError = {
  error?: { message: string };
  data?: TaskProgress;
};

export async function updateTaskProgress(
  props: IGetTaskProgressProps,
): Promise<TaskProgressWithError> {
  const { userId, taskId, taskStatus, taskScore, taskAttempt, taskAttempts } =
    props;

  try {
    const taskProgress = await prisma.taskProgress.update({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
      data: {
        attempts: {
          push: taskAttempts,
        },
        attempt: taskAttempt,
        status: taskStatus,
        score: taskScore,
      },
    });
    return { data: taskProgress };
  } catch {
    return {
      error: { message: 'Произошла ошибка при обновлении записи TaskProgress' },
    };
  }
}
