import { User } from '@prisma/client';
import { prisma } from '@/7 shared/index';

type UserWithError = {
  error?: { message: string };
  data?: Pick<User, 'email'>;
};

export async function getUser(userId: string): Promise<UserWithError> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) return { error: { message: 'Пользователь User не найден' } };

    return { data: user };
  } catch {
    return {
      error: {
        message: 'Произошла ошибка при получении данных пользователя User',
      },
    };
  }
}
