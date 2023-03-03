import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
export class PagintionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number) // better alternative than transform and transformOptions
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number) // better alternative than transform and transformOptions
  page?: number;
}
