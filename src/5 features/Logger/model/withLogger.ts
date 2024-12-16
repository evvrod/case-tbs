import { NextRequest, NextResponse } from 'next/server';
import { logger } from '../lib/logger';
import { CustomError } from '../lib/CustomError';

interface IParams {
  params: Promise<{ id: string }>;
}

export function withLogger(
  handler: (req: NextRequest, { params }: IParams) => Promise<NextResponse>,
) {
  return async (req: NextRequest, { params }: IParams) => {
    try {
      logger.info(`Request: ${req.method} ${req.url}`);

      const res = await handler(req, { params });
      logger.info(`Response:  ${req.method} ${req.url}`);
      // ${res.statusCode}
      return res;
    } catch (error) {
      if (error instanceof CustomError) {
        logger.error(error);
      } else {
        logger.error(
          new CustomError({
            message: 'Unknown error',
            status: 500,
            code: 'UNKNOWN_ERROR',
          }),
        );
      }

      throw error;
    }
  };
}
