import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Request,
  Query
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { ListResponse, LoginResponse, RequestsResponse, ValidRoles } from './interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/rooms/dto/pagination.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post()
  // @ApiResponse({ status:201, description: 'User registered' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.create(createUserDto);
  }
  
  @Post('register')
  register( @Body() createUserDto: CreateUserDto ): Promise<LoginResponse> {
    return this.authService.register( createUserDto )
  }
  
  @Post('login')
  // @ApiResponse({ status:201, description: 'User logged in' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login( loginUserDto );
  }
  
  @Get()
  @Auth()
  // @ApiResponse({ status:201, description: 'Show users list' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  userList( @Request() req: Request, @Query()paginationDto: PaginationDto ): Promise<ListResponse> {
    // const user: User = req['user']
    return this.authService.list(req['user'], paginationDto);
  }
  
  
  @Patch(':id')
  @Auth()
  // @ApiResponse({ status:201, description: 'Update user if exist' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  update( @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: Request): Promise<RequestsResponse> {
    return this.authService.update(id, updateUserDto, req['user'])
  }
  
  @Get('checkAuth')
  @Auth()
  checkAuthStatus( @Request() req: Request ) {
    return this.authService.checkAuthStatus(req['user'])
  }
  
  @Get('total')
  @Auth()
  getTotalUsers() {
    return this.authService.getNumberUsers()
  }
  
  @Get(':term')
  @Auth()
  // @ApiResponse({ status:201, description: 'Show user if exist' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findOneUser( @Param('term') term: string, @Request() req: Request): Promise<RequestsResponse> {
    return this.authService.findBy(term, req['user'])
  }

}
