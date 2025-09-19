import winston from 'winston';

const logLevel = process.env.LOG_LEVEL || 'info';
const nodeEnv = process.env.NODE_ENV || 'development';

// Custom format for structured JSON logging
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...rest } = info;
    return JSON.stringify({
      timestamp,
      level,
      message,
      environment: nodeEnv,
      ...rest,
    });
  })
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...rest }) => {
    const meta = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${meta}`;
  })
);

// Create logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: nodeEnv === 'production' ? jsonFormat : consoleFormat,
  defaultMeta: { 
    service: 'gravity-ai-api',
    version: '1.0.0' 
  },
  transports: [
    new winston.transports.Console(),
  ],
});

// Add file transport for production
if (nodeEnv === 'production') {
  logger.add(new winston.transports.File({ 
    filename: 'logs/error.log', 
    level: 'error',
    format: jsonFormat,
  }));
  
  logger.add(new winston.transports.File({ 
    filename: 'logs/combined.log',
    format: jsonFormat,
  }));
}
