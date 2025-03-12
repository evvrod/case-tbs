import { prisma } from '@/7 shared/index';
import { UserProgress } from '@prisma/client';

interface IUpdateUserProgress {
  userId: string;
  taskScore: number;
}

type UserProgressWithError = {
  error?: { message: string };
  data?: UserProgress;
};

export async function updateUserProgress(
  props: IUpdateUserProgress,
): Promise<UserProgressWithError> {
  const { userId, taskScore } = props;

  try {
    const userProgress = await prisma.userProgress.update({
      where: { userId: userId },
      data: {
        totalScore: {
          increment: taskScore,
        },
      },
    });
    return { data: userProgress };
  } catch {
    return {
      error: { message: 'Произошла ошибка при обновлении записи UserProgress' },
    };
  }
}
