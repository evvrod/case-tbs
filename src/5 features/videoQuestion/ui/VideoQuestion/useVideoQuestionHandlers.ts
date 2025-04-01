import { useState, useCallback } from 'react';
import { TaskProgress } from '@prisma/client';

import { SlideWithRelations } from '@/6 entities/Slide';
import { revalidateServerComponents } from '@/7 shared/lib/revalidateServerComponents';
import { submitAnswer } from '../../lib/submitAnswer';

interface Attempt {
  score: number;
  answer: number;
  isCorrect: boolean;
}
const USER_ID = '94043265-ff18-4f41-899f-bf206c277d3f';

interface IVideoQuestionProps {
  slide: SlideWithRelations;
  taskProgress: TaskProgress;
}

export function useVideoQuestionHandlers(props: IVideoQuestionProps) {
  const { slide, taskProgress } = props;

  const { id, task } = slide;
  const { attempts, attempt, status } = taskProgress;

  const attemptsArray: Attempt[] = Array.isArray(attempts)
    ? (attempts as unknown as Attempt[])
    : [];
  const lastAttempt = attemptsArray.at(-1);
  const currentAttempt = (attempt || 0) + 1;

  if (!task || !task.videoQuestion) throw new Error('Задача не найдена');

  const isCompleted = status === 'COMPLETED';

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(isCompleted);

  const initSelectedOption = lastAttempt ? lastAttempt.answer : null;
  const [selectedOption, setSelectedOption] = useState<number | null>(
    initSelectedOption,
  );

  const [isError, setIsError] = useState<boolean>(false);

  const getBackgroundImage = useCallback((srcSet = '') => {
    const imageSet = srcSet
      .split(', ')
      .map((str) => {
        const [url, dpi] = str.split(' ');
        return `url("${url}") ${dpi}`;
      })
      .join(', ');

    return {
      height: '100%',
      width: '100%',
      backgroundImage: `image-set(${imageSet})`,
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedOption === null || !task || !task.videoQuestion) {
      return;
    }

    try {
      const result = await submitAnswer({
        userId: USER_ID,
        taskId: task.id,
        taskAttempt: currentAttempt,
        selectedOption,
      });

      if (result.error) throw new Error(result.error.message);

      setIsFeedbackVisible(true);
      await revalidateServerComponents(`/slides/${id}`);
    } catch {
      setIsError(true);
    }
  }

  function handleReset() {
    setSelectedOption(null);
    setIsFeedbackVisible(false);
  }

  function handleSelectOption(option: number) {
    setSelectedOption(option);
    setIsFeedbackVisible(false);
  }

  return {
    getBackgroundImage,
    handleSubmit,
    handleReset,
    selectedOption,
    handleSelectOption,
    videoQuestion: task.videoQuestion,
    score: task.score,
    correctOption: isCompleted ? task.videoQuestion.correctOption : null,

    isSuccess: lastAttempt?.isCorrect || false,
    isCompleted,
    isFeedbackVisible,

    attempt: task.attempts,
    remainingAttempts: task.attempts + 1 - currentAttempt,

    isError,
  };
}
