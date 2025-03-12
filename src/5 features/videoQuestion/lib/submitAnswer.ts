'use server';

import { TaskStatus } from '@prisma/client';

import { getTask } from '@/6 entities/Task/index';
import { updateTaskProgress } from '@/6 entities/TaskProgress/index';
import { updateUserProgress } from '@/6 entities/User/index';

interface ISubmitAnswerProps {
  userId: string;
  taskId: string;
  taskAttempt: number;
  selectedOption: number;
}

export async function submitAnswer(props: ISubmitAnswerProps) {
  const { userId, taskId, taskAttempt, selectedOption } = props;
  try {
    const task = await getTask(taskId);

    if (task.error) return { error: task.error };

    const taskData = task.data;

    if (!taskData) return { error: { message: 'Задание не найдено' } };
    if (taskData.attempts < taskAttempt)
      return { error: { message: 'Превышено количество попыток' } };
    if (!taskData.videoQuestion)
      return { error: { message: 'Задание не является видео' } };

    const isCorrect = taskData.videoQuestion.correctOption === selectedOption;
    const IsCompleted = isCorrect || taskData.attempts === taskAttempt;

    const taskStatus: TaskStatus = IsCompleted ? 'COMPLETED' : 'IN_PROGRESS';
    const taskScore = isCorrect ? taskData.score : 0;

    const newTaskProgress = await updateTaskProgress({
      userId,
      taskId,
      taskStatus,
      taskAttempt,
      taskScore,
      taskAttempts: {
        score: taskScore,
        answer: selectedOption,
        isCorrect,
      },
    });

    if (newTaskProgress.error) return { error: newTaskProgress.error };

    if (taskScore > 0) {
      const newUserProgress = await updateUserProgress({ userId, taskScore });
      if (newUserProgress.error) return { error: newUserProgress.error };
    }

    return { data: { isCorrect, IsCompleted } };
  } catch {
    return {
      error: {
        message: 'Произошла ошибка при выполнении операции submitAnswer',
      },
    };
  }
}
