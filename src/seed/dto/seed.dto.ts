import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SeedDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  deleteType: string;
}
