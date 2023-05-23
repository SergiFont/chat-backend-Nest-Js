import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  isEmail,
} from 'class-validator';

export class CreateAdminDto {

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @Matches(/^\S*$/, {
    message:
    'Username cannot contain white spaces'
  })
  username: string;

  @ApiProperty()
  @IsArray()
  roles: string[];

  @ApiProperty()
  @IsEmail()
  email: string
}
