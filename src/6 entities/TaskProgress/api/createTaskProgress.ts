import { TaskProgress } from '@prisma/client';
import { prisma } from '@/7 shared/index';

interface ICreateTaskProgressProps {
  userId: string;
  taskId: string;
}

type TaskProgressWithError = {
  error?: { message: string };
  data?: TaskProgress;
};

export async function createTaskProgress(
  props: ICreateTaskProgressProps,
): Promise<TaskProgressWithError> {
  const { userId, taskId } = props;
  try {
    const taskProgress = await prisma.taskProgress.create({
      data: {
        userId,
        taskId,
        status: 'IN_PROGRESS',
        attempts: [],
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

    return { data: taskProgress };
  } catch {
    return {
      error: { message: 'Произошла ошибка при создании записи TaskProgress' },
    };
  }
}
