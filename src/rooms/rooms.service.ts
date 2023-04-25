import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { FilesService } from 'src/files/files.service';
import { ExceptionHandlerService } from 'src/exception-handler/exception-handler.service';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = this.roomRepository.create(createRoomDto); // crea instancia del room
      await this.roomRepository.save(room); // graba la instancia en la base de datos

      return room;
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.roomRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let room: Room;

    if (isUUID(term)) room = await this.roomRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.roomRepository.createQueryBuilder();
      room = await queryBuilder
        .where('UPPER(name) =:name or slug =:slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();
    } // pasa a mayusculas el titulo buscado, y a mayusculas todos los titulos de la base de datos en los que busca.
    // de esta manera, da igual la combinacion de mayusculas o minusculas que nos pasen por query, siempre lo va a encontrar.

    if (!room)
      throw new NotFoundException(`Room with term "${term}" not found`);
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
    });

    if (!room) throw new NotFoundException(`Room with id: ${id} not found`);

    try {
      await this.roomRepository.save(room);
      return room;
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.roomRepository.delete(id);
    return 'Room deleted';
  }

  async deleteAllRooms() {
    const query = this.roomRepository.createQueryBuilder('rooms');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }
}
