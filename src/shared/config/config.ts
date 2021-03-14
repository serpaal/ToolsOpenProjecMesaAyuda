import { IConfig } from '../interfaces';


export const Config : IConfig = {
  environment: process.env.NODE_ENV || 'development',
  lang: process.env.LANG || 'en',
  express: {
    port: process.env.EXPRESS_PORT || 9001,
    testPort: process.env.EXPRESS_TEST_PORT || 9002,
    morganDirectory: process.env.EXPRESS_MORGAN_DIRECTORY || `${process.cwd()}/logs/access`,
    morganLogFormat: process.env.EXPRESS_MORGAN_LOG_FORMAT || ':method :url :remote-addr :referrer :date :status'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '30000s',
    algoritm: process.env.JWT_ALGORITM || 'HS256'
  },
  mail: {
    from: process.env.TEST_MAIL_FROM || 'support@test.com',
    to: process.env.TEST_MAIL_TO ||'support@test.com',
    port: process.env.TEST_MAIL_PORT || 1025
  },
  sequelize: {
    development: {
      username: process.env.DEV_POSTGRES_USER || 'postgres',
      password: process.env.DEV_POSTGRES_PASSWORD || 'postgres',
      database: process.env.DEV_POSTGRES_DB || 'postgres',
      host: process.env.DEV_DB_HOST || '127.0.0.1',
      port: Number(process.env.DEV_POSTGRES_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
      force: true,
      timezone: '-04:00'     
    },
    production: {
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: '-04:00'
    }
  },
  winston: {
    level: process.env.WINSTON_LEVEL || 'error',
    winstonDirectory: process.env.WINSTON_DIRECTORY || `${process.cwd()}/logs`
  }
};