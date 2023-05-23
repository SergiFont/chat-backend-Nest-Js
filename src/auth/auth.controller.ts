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
import { Auth } from './decorators';
import { ListResponse, LoginResponse, RequestsResponse, ValidRoles } from './interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/rooms/dto/pagination.dto';
import { User } from './entities/user.entity';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered', type: User })
  @ApiResponse({ status: 400, description: 'Bad request, email or username already exists' })
  register( @Body() createUserDto: CreateUserDto ): Promise<LoginResponse> {
    return this.authService.register( createUserDto )
  }
  
  @Post('login')
  @ApiResponse({ status: 201, description: 'User logged in', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, credentials are not valid (email or password)' })
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login( loginUserDto );
  }
  
  @Get()
  @Auth()
  @ApiResponse({ status: 200, description: 'Return users list', type: [User] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  userList( @Request() req: Request, @Query()paginationDto: PaginationDto ): Promise<ListResponse> {
    return this.authService.list(req['user'], paginationDto);
  }
  
  
  @Patch(':id')
  @Auth()
  @ApiResponse({ status: 201, description: 'Update user if exist', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. email or password incorrect' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  update( @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: Request): Promise<RequestsResponse> {
    return this.authService.update(id, updateUserDto, req['user'])
  }
  
  @Get('checkAuth')
  @Auth()
  @ApiResponse({ status: 200, description: 'User Authorized', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  checkAuthStatus( @Request() req: Request ) {
    return this.authService.checkAuthStatus(req['user'])
  }
  
  
  @Get('total')
  @Auth()
  @ApiResponse({ status: 200, description: 'Get number of users', type: Number })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  getTotalUsers() {
    return this.authService.getNumberUsers()
  }
  
  @Get(':term')
  @Auth()
  @ApiResponse({ status: 200, description: 'Show user if exist', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  findOneUser( @Param('term') term: string, @Request() req: Request): Promise<RequestsResponse> {
    return this.authService.findBy(term, req['user'])
  }
}
