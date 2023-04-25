import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
