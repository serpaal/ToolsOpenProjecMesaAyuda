import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { AppService } from './app.service';
import { RequerimientosModule } from './modules/requerimientos/requerimientos.module';

@Module({
  imports: [DatabaseModule, AuthModule, RequerimientosModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ]
})
export class AppModule {}
