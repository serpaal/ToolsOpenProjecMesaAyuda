import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SetIncidentesRequest {
  @IsNotEmpty()
  @ApiProperty()
  public incidentes_json: any;   
}