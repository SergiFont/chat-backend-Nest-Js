import { Injectable } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { initialRooms, initialUsers } from './data/seed-data';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { SeedAdmin, SeedUser } from './interfaces';
import { ConfigService } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/auth/entities/user.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly authService: AuthService,
    private readonly roomsService: RoomsService,
    @InjectRepository( User )
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async runSeed(): Promise<string> {

    await this.deleteTables()

    await this.insertNewData();

    return 'Seed Executed';
  }

  private async deleteTables(): Promise<void> {

    await this.roomsService.deleteAllRooms()

    const queryBuilder = this.userRepository.createQueryBuilder()
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertNewData() {
    await this.roomsService.deleteAllRooms();
    await this.authService.deleteAllUsers();

    const rooms = initialRooms.rooms;
    const users = initialUsers.users;

    const insertPromises = [];

    rooms.forEach((room) => {
      insertPromises.push(this.roomsService.create(room));
    });

    users.forEach((user) => {
      insertPromises.push(this.authService.create(user));
    });

    const adminPass = this.configService.get('ADMIN_PASS')
    const admin : SeedAdmin = {
      email: 'admin@mail.com',
      password: adminPass,
      username: 'admin',
      isActive: true,
      roles: ['admin']
    }
    insertPromises.push(this.authService.createAdmin(admin))

    await Promise.all(insertPromises);

    return true;
  }
}
