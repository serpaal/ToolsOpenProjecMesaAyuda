import { IDatabaseConfig } from '../interfaces';
import { Config } from './config';

export const databaseConfig: IDatabaseConfig = {
    development: Config.sequelize.development,
    production: Config.sequelize.production
};
