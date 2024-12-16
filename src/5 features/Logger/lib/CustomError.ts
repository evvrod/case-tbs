interface ICustomError {
  message: string;
  status?: number;
  code?: string;
  details?: string | Record<string, unknown>;
  stack?: string;
}

export class CustomError extends Error {
  status?: number;
  code?: string;
  details?: string | Record<string, unknown>;
  stack?: string;

  constructor(error: ICustomError) {
    const { message, status, code, details, stack } = error;

    super();
    this.message = message;
    this.status = status;
    this.code = code;
    this.details = details;
    this.stack = stack;
    this.name = 'CustomError';
  }
}
