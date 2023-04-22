import { Injectable } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { initialRooms, initialUsers } from './data/seed-data';

@Injectable()
export class SeedService {
  
  constructor (
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService
  ) {}

  async runSeed() {
    await this.insertNewData()

    return 'Seed Executed'
  }

  private async insertNewData() {
    await this.roomsService.deleteAllRooms()
    await this.usersService.deleteAllUsers()

    const rooms = initialRooms.rooms
    const users = initialUsers.users

    const insertPromises = []

    rooms.forEach( room => {
      insertPromises.push( this.roomsService.create( room ))
    })

    users.forEach( user => {
      insertPromises.push( this.usersService.create( user ))
    })

    await Promise.all( insertPromises )

    return true
  }

}
