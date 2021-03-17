import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRequerimientosRequest {
  @IsNotEmpty()
  @ApiProperty()
  public requerimientos_json: any;   
}