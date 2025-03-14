import { getTaskProgress } from './getTaskProgress';
import { createTaskProgress } from './createTaskProgress';

export async function getTaskProgressOrCreate({
  userId,
  taskId,
}: {
  userId: string;
  taskId: string;
}) {
  let taskProgress = await getTaskProgress({
    userId,
    taskId,
  });

  if (taskProgress.error) {
    taskProgress = await createTaskProgress({
      userId,
      taskId,
    });

    if (taskProgress.error) return { error: taskProgress.error };
  }

  return taskProgress;
}
