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
import { PaginationDto } from './dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { FilesService } from 'src/files/files.service';
import { ExceptionHandlerService } from 'src/exception-handler/exception-handler.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      const room = this.roomRepository.create(createRoomDto); // crea instancia del room
      await this.roomRepository.save(room); // graba la instancia en la base de datos

      return room;
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Room[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.roomRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findBy(term: string): Promise<Room[]> {
    let rooms: Room[];

    if (isUUID(term)) rooms = await this.roomRepository.findBy({ id: term });
    else {
      const queryBuilder = this.roomRepository.createQueryBuilder();
      rooms = await queryBuilder
        .where('UPPER(name) LIKE :name or slug LIKE :slug', {
          name: `%${term.toUpperCase()}%`,
          slug: `%${term.toLowerCase()}%`,
        })
        .getMany();
    }

    if (!rooms)
      throw new NotFoundException(`Room with term "${term}" not found`);
    return rooms;
  }

  async findOne(term: string): Promise<Room[]> {
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
    }

    if (!room)
      throw new NotFoundException(`Room with term "${term}" not found`);
    return [room];
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
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

  async remove(id: string): Promise<string> {
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

  getNumberRooms() {
    return this.roomRepository.count() 
  }
}
