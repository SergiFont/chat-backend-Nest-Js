import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
