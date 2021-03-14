import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SetRequerimientosRequest {
  @IsNotEmpty()
  //@IsString()
  @ApiProperty()
  public requerimientos_json: any;   
}