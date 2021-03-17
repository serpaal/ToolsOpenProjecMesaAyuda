import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIncidentesRequest {
  @IsNotEmpty()
  @ApiProperty()
  public incidentes_json: any;   
}