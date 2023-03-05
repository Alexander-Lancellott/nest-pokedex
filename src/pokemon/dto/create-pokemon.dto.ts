import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive, MinLength, Min } from 'class-validator';

export class CreatePokemonDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;
}
