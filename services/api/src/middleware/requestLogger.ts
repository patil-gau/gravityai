import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  
  // Log request
  logger.info('Incoming request', {
    request: {
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      contentLength: req.get('Content-Length'),
    },
  });

  // Capture response details
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('Request completed', {
      request: {
        method: req.method,
        url: req.url,
        ip: req.ip,
      },
      response: {
        statusCode: res.statusCode,
        contentLength: res.get('Content-Length'),
        duration: `${duration}ms`,
      },
    });
  });

  next();
};
