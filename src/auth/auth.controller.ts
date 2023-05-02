import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  ParseUUIDPipe,
  Patch
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<Object> {
    return this.authService.login( loginUserDto );
  }

  @Get()
  @Auth()
  userList(@GetUser() user: User): Promise<Object> {
    return this.authService.list(user);
  }

  @Get(':term')
  @Auth()
  findOneUser(@Param('term') term: string, @GetUser() user: User): Promise<Object> {
    return this.authService.findOne(term, user)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update( @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<Object> {
    return this.authService.update(id, updateUserDto)
  }

}
