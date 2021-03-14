import  { Config } from '../config';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.prettyPrint()
    ),
    transports: [
        new transports.Console({
            handleExceptions: true,
            level: Config.winston.level
        }),
        new transports.File({ 
            level: Config.winston.level, 
            filename: `${Config.winston.winstonDirectory}/error.log`
        })
    ],
    exitOnError: false  
});