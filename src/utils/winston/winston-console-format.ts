import * as winston from 'winston';
const { printf } = winston.format;

export const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const date = new Date(timestamp);
  const dateString = [date?.getDate(), date?.getMonth() + 1, date?.getFullYear()].join('.');
  const timeString = date?.toTimeString()?.slice(0, 8);

  return `[${dateString}, ${timeString}] ${level.toUpperCase()}: ${message} ${
    meta && Object.keys(meta)?.length > 0 ? JSON.stringify(meta) : ''
  }`;
});
