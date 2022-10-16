import * as winston from 'winston';
import { consoleFormat } from 'utils/winston/winston-console-format';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV === 'develop') {
  logger.add(new winston.transports.Console({ format: combine(timestamp(), consoleFormat) }));
}
