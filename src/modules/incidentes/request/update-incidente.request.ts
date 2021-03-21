import { IsDate, IsNotEmpty, IsString, IsNumber, IsOptional, Length } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIncidenteRequest {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public id: number;
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public nro_inc: string;
  
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  public fecha_sol: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public nomb_comp: string; 
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public arch_adj: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public observ: string; 
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public descrip: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public cod_u_rbl: string; 
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public estado: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_id: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_title: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_status: string; 

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_percentage_done: number; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_assignee: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_responsible: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public open_project_priority: string; 

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public username: string; 
}