'use client ';

import { useState } from 'react';
import { TaskProgress } from '@prisma/client';

import { SlideWithRelations } from '@/6 entities/Slide';

import { revalidateServerComponents } from '@/7 shared/lib/revalidateServerComponents';

import { ItemTypes } from '../../modal/ItemTypes';

interface DustbinState {
  type: string;
  items: BoxState[];
  maxItems: number | null;
}

interface BoxState {
  id: number;
  name: string;
  type: string;
}

interface Attempt {
  score: number;
  answer: number;
  isCorrect: boolean;
}
const USER_ID = '94043265-ff18-4f41-899f-bf206c277d3f';

interface IDNDQuestionProps {
  slide: SlideWithRelations;
  taskProgress: TaskProgress;
}

export function useDNDQuestionHandlers(props: IDNDQuestionProps) {
  const { slide, taskProgress } = props;

  console.log(slide.task?.dragAndDrop?.options);
  console.log(taskProgress);

  const { id, task } = slide;
  const { attempts, attempt, status } = taskProgress;

  const attemptsArray: Attempt[] = Array.isArray(attempts)
    ? (attempts as unknown as Attempt[])
    : [];
  const lastAttempt = attemptsArray.at(-1);
  const currentAttempt = (attempt || 0) + 1;

  if (!task || !task.dragAndDrop) throw new Error('Задача не найдена');

  const isCompleted = status === 'COMPLETED';

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(isCompleted);

  const initSelectedOption = lastAttempt ? lastAttempt.answer : null;
  const [selectedOption, setSelectedOption] = useState<number | null>(
    initSelectedOption,
  );

  const [isError, setIsError] = useState<boolean>(false);

  const options = slide.task?.dragAndDrop?.options
    ? Object.entries(slide.task?.dragAndDrop?.options).map(([key, value]) => ({
        id: Number(key),
        name: value,
        type: ItemTypes.ITEM,
      }))
    : [];

  const [dustbins, setDustbins] = useState<DustbinState[]>([
    {
      type: ItemTypes.ITEM,
      items: options,
      maxItems: null,
    },
    { type: ItemTypes.ITEM, items: [], maxItems: 2 },
    {
      type: ItemTypes.ITEM,
      items: [],
      maxItems: 1,
    },
  ]);

  const handleDrop = (
    index: number,
    item: { id: number; name: string; type: string },
  ) => {
    setDustbins((prevDustbins) => {
      let newDustbins = [...prevDustbins];

      // Удаляем элемент из предыдущей корзины
      newDustbins = newDustbins.map((dustbin) => {
        const filteredItems = dustbin.items.filter((box) => box.id !== item.id);
        return { ...dustbin, items: filteredItems };
      });

      // Получаем текущую корзину
      const targetDustbin = newDustbins[index];

      // Проверяем, если корзина имеет лимит и лимит превышен
      if (
        targetDustbin.maxItems !== null &&
        targetDustbin.items.length >= targetDustbin.maxItems
      ) {
        const [firstItem, ...remainingItems] = targetDustbin.items; // Извлекаем первый элемент

        newDustbins[0].items.push(firstItem); // Добавляем первый элемент в корзину 0
        newDustbins[index].items = remainingItems; // Оставляем оставшиеся элементы в текущей корзине

        newDustbins[index].items.push(item);

        return newDustbins; // Возвращаем обновленные корзины
      }

      // Если лимит не превышен, добавляем элемент в корзину
      newDustbins[index].items.push(item);

      return newDustbins;
    });
  };

  async function handleSubmit() {
    try {
      // const result = await submitAnswer({
      //   userId: USER_ID,
      //   taskId: task.id,
      //   taskAttempt: currentAttempt,
      //   selectedOption,
      // });

      // if (result.error) throw new Error(result.error.message);

      await revalidateServerComponents(`/slides/${id}`);
    } catch {}
  }

  function handleReset() {
    setSelectedOption(null);
    setIsFeedbackVisible(false);
  }

  return {
    dustbins,
    handleDrop,
    handleSubmit,
    handleReset,
    selectedOption,

    dragAndDrop: task.dragAndDrop,
    score: task.score,
    correctOption: isCompleted ? task.dragAndDrop.correctOption : null,

    isSuccess: lastAttempt?.isCorrect || false,
    isCompleted,
    isFeedbackVisible,

    attempt: task.attempts,
    remainingAttempts: task.attempts + 1 - currentAttempt,
  };
}
