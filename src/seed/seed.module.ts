import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    RoomsModule, 
    AuthModule
  ],
})
export class SeedModule {}
