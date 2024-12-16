import { CustomError } from '../lib/CustomError';
import { LevelLogs } from './levelLogs';

interface IClientLogger {
  type: LevelLogs;
  log: string | CustomError;
}

export async function clientLogger(log: IClientLogger) {
  await fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  });
}
