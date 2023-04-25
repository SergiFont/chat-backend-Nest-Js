import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [RoomsModule, UsersModule],
})
export class SeedModule {}
