import { Injectable } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { initialRooms, initialUsers } from './data/seed-data';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly authService: AuthService,
    private readonly roomsService: RoomsService,
  ) {}

  async runSeed() {
    await this.insertNewData();

    return 'Seed Executed';
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

    await Promise.all(insertPromises);

    return true;
  }
}
