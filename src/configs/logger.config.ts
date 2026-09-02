import winston from 'winston';
import path from 'path';
import 'dotenv/config';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  },
};

winston.addColors(customLevels.colors);

export class LoggerConfig {
  private static readonly isProduction = process.env.NODE_ENV === 'production';

  private static readonly consoleFormat = combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    printf(({ level, message, timestamp, stack, ...meta }) => {
      const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
      return `[${timestamp}] ${level}: ${stack || message} ${metaStr}`;
    }),
  );

  private static readonly fileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json(),
  );

  private static instance: winston.Logger;

  private static build(): winston.Logger {
    const logger = winston.createLogger({
  levels: customLevels.levels,
  level: LoggerConfig.isProduction ? 'info' : 'debug',
  format: LoggerConfig.consoleFormat,
  defaultMeta: { service: 'POPO-LAUNDRY-API' },
  transports: [
    new winston.transports.Console(),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
  ],
});

return logger;
  }

  static getInstance(): winston.Logger {
    if (!LoggerConfig.instance) {
      LoggerConfig.instance = LoggerConfig.build();
    }
    return LoggerConfig.instance;
  }
}

export const logger = LoggerConfig.getInstance();