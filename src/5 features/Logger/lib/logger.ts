import winston from 'winston';
import { CustomError } from './CustomError';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_MAX_SIZE = Number(process.env.LOG_MAX_SIZE) || 5;

const transport = new winston.transports.File({
  filename: 'logs/error.log',
  zippedArchive: true,
  maxsize: LOG_MAX_SIZE * 1024 * 1024,
});

const loggerConfig = winston.createLogger({
  level: LOG_LEVEL,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message} ${
        meta && Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`;
    }),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    transport,
  ],
});

export const logger = {
  error: (error: CustomError) => {
    const errorMessage = `
    Message: ${error.message}
    Code: ${error.code}
    Status: ${error.status}
    Details: ${JSON.stringify(error.details) || 'No details'}
    Stack: ${error.stack || 'No stack available'}
  `;
    loggerConfig.error(errorMessage);
  },
  warn: (message: string) => loggerConfig.warn(message),
  info: (message: string) => loggerConfig.info(message),
  verbose: (message: string) => loggerConfig.verbose(message),
  debug: (message: string) => loggerConfig.debug(message),
  silly: (message: string) => loggerConfig.silly(message),
};
