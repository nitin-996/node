import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize, printf } = format;

// Custom format for console logging with colors and timestamps
const consoleLogFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()), // JSON format for file logs
  transports: [
    new transports.Console({
      format: consoleLogFormat, // Console gets colors & timestamp
    }),
    new transports.File({ 
      filename: "app.log",
      format: json(), // Ensure JSON format for file logs
    }),
  ],
});

export default logger;
