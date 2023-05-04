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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  @ApiResponse({ status:201, description: 'User registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status:201, description: 'User logged in' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<Object> {
    return this.authService.login( loginUserDto );
  }

  @Get()
  @Auth()
  @ApiResponse({ status:201, description: 'Show users list' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  userList(@GetUser() user: User): Promise<Object> {
    return this.authService.list(user);
  }

  @Get(':term')
  @Auth()
  @ApiResponse({ status:201, description: 'Show user if exist' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findOneUser(@Param('term') term: string, @GetUser() user: User): Promise<Object> {
    return this.authService.findOne(term, user)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status:201, description: 'Update user if exist' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  update( @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<Object> {
    return this.authService.update(id, updateUserDto)
  }

}
