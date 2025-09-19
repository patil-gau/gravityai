import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log error with context
  logger.error('API Error', {
    error: {
      message: err.message,
      stack: err.stack,
      code: err.code,
    },
    request: {
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    },
    statusCode,
  });

  // Don't expose internal errors in production
  const isProduction = process.env.NODE_ENV === 'production';
  const responseMessage = statusCode === 500 && isProduction 
    ? 'Internal Server Error' 
    : message;

  res.status(statusCode).json({
    error: {
      message: responseMessage,
      code: err.code,
      timestamp: new Date().toISOString(),
      ...(isProduction ? {} : { stack: err.stack }),
    },
  });
};
