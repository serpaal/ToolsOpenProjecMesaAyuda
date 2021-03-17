import { Module } from '@nestjs/common';
import { IncidentesService } from './incidentes.service';
import { IncidentesController } from './incidentes.controller';
import { IncidentesProvider } from './incidentes.provider';

@Module({
  providers: [IncidentesProvider, IncidentesService],
  controllers: [IncidentesController]
})
export class IncidentesModule {}
