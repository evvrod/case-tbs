import { NextResponse } from 'next/server';
import { logger } from '@/5 features/Logger/index.server';
import { LevelLogs } from '@/5 features/Logger';

export async function POST(req: Request) {
  try {
    const { type, log } = await req.json();
    switch (type) {
      case LevelLogs.error:
        logger.error(log);
        break;
      case LevelLogs.warn:
        logger.warn(log);
        break;
      case LevelLogs.info:
        logger.info(log);
        break;
    }

    return NextResponse.json(
      { message: 'Log processed successfully' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'Error logging failed' },
      { status: 500 },
    );
  }
}
