import { Prisma } from '@prisma/client';

import { prisma } from '@/7 shared/index';

type SlideWithError = {
  error?: { message: string };
  data?: SlideWithRelations;
};

export async function getSlide(id: number): Promise<SlideWithError> {
  try {
    const slide = await prisma.slide.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        taskId: true,
        task: {
          select: {
            id: true,
            type: true,
            score: true,
            attempts: true,
            createdAt: true,
            updatedAt: true,
            videoQuestion: {
              select: {
                id: true,
                taskId: true,
                title: true,
                question: true,
                options: true,
                correctOption: true,
              },
            },
          },
        },
      },
    });

    if (!slide) return { error: { message: 'Слайд Slide не найден' } };

    return { data: slide };
  } catch {
    return {
      error: { message: 'Произошла ошибка при получении данных слайда Slide' },
    };
  }
}

export type SlideWithRelations = Prisma.SlideGetPayload<{
  select: {
    id: true;
    title: true;
    type: true;
    createdAt: true;
    updatedAt: true;
    taskId: true;
    task: {
      select: {
        id: true;
        type: true;
        attempts: true;
        score: true;
        createdAt: true;
        updatedAt: true;
        videoQuestion: {
          select: {
            id: true;
            taskId: true;
            title: true;
            question: true;
            options: true;
            correctOption: true;
          };
        };
      };
    };
  };
}>;
