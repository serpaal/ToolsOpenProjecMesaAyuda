import { Global, Module } from '@nestjs/common';
import { DatabaseUtilitiesService } from './database-utilites.serive';
import { databaseProvider } from './database.provider';

@Global()
@Module({
    providers: [databaseProvider, DatabaseUtilitiesService],
    exports: [databaseProvider, DatabaseUtilitiesService]
})
export class DatabaseModule {} 
