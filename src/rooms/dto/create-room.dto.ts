import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;
}
