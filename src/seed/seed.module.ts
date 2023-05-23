import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    RoomsModule, 
    AuthModule,
    ConfigModule
  ],
})
export class SeedModule {}
