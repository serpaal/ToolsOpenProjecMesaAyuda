import { Module } from '@nestjs/common';
import { RequerimientosService } from './requerimientos.service';
import { RequerimientosController } from './requerimientos.controller';
import { RequerimientosProvider } from './requerimientos.provider';

@Module({
  providers: [RequerimientosProvider, RequerimientosService],
  controllers: [RequerimientosController]
})
export class RequerimientosModule {}
