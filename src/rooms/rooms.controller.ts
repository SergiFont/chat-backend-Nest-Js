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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PaginationDto } from './dto/pagination.dto';
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
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  create(
    @Body() createRoomDto: CreateRoomDto
  ) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('total')
  @Auth()
  getTotalRooms() {
    return this.roomsService.getNumberRooms()
  }

  @Get()
  @Auth()
  @ApiResponse({ status: 201, description: 'Show list of rooms', type: [Room] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.roomsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  @ApiResponse({ status: 201, description: 'Showing room if exist', type: Room })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findBy(@Param('term') term: string) {
    return this.roomsService.findBy(term);
  }

  @Patch(':id')
  @Auth()
  @ApiResponse({ status: 201, description: 'Update room if exist', type: Room })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @Auth()
  @ApiResponse({ status: 201, description: 'Delete room if exist', type: Room })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.remove(id);
  }

}
