import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto, PaginationDto } from './dto';
import { Auth } from 'src/auth/decorators';
import { Room } from './entities/room.entity';
@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Room was created', type: Room })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not a valid role' })
  create(
    @Body() createRoomDto: CreateRoomDto
  ) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('total')
  @Auth()
  @ApiResponse({ status: 200, description: 'Return number of rooms', type: Number })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  getTotalRooms() {
    return this.roomsService.getNumberRooms()
  }

  @Get()
  @Auth()
  @ApiResponse({ status: 200, description: 'Show list of rooms', type: [Room] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.roomsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  @ApiResponse({ status: 200, description: 'Showing room if exist', type: Room })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  findBy(@Param('term') term: string) {
    return this.roomsService.findBy(term);
  }

  @Patch(':id')
  @Auth()
  @ApiResponse({ status: 201, description: 'Update room if exist', type: Room })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @Auth()
  @ApiResponse({ status: 200, description: 'Delete room if exist' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.remove(id);
  }

}
