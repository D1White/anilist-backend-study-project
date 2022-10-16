import * as winston from 'winston';
import { WinstonModuleAsyncOptions } from 'nest-winston';
import { consoleFormat } from 'utils/winston/winston-console-format';
const { combine, timestamp, json } = winston.format;

const getWinstonTransports = () => {
  const winstonTransports: winston.transport[] = [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ];

  if (process.env.NODE_ENV === 'develop') {
    winstonTransports.push(
      new winston.transports.Console({ format: combine(timestamp(), consoleFormat) }),
    );
  }

  return winstonTransports;
};

export const winstonAsyncConfig: WinstonModuleAsyncOptions = {
  useFactory: () => {
    return {
      level: 'info',
      format: combine(timestamp(), json()),
      transports: getWinstonTransports(),
    };
  },
};
