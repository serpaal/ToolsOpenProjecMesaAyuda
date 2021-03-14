import { Sequelize } from 'sequelize-typescript';
import { Config } from '../../shared/config';
import { databaseConfig } from '../../shared/config/database.config';
import { Requerimientos } from '../requerimientos/requerimientos.model';

export const databaseProvider = {
    provide: 'SequelizeInstance',
    useFactory: async () => {
        let config;
        switch (Config.environment) {
            case 'prod':
                config = databaseConfig.production;
                break;
            case 'production':
                config = databaseConfig.production;
                break;
            case 'dev':
                config = databaseConfig.development;
                break;
            case 'development':
                config = databaseConfig.development;
                break;
            default:
                config = databaseConfig.development;
                break;
        }

        const sequelize = new Sequelize(config);
        sequelize.addModels([
            Requerimientos
        ]);
        /* await sequelize.sync(); */
        return sequelize;
    }
}; 