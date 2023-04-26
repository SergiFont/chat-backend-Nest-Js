import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FakeUser } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserImage } from './entities/user-images.entity';
import { ExceptionHandlerModule } from 'src/exception-handler/exception-handler.module';
import { Room } from 'src/rooms/entities/room.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([FakeUser, UserImage, Room]), 
    ExceptionHandlerModule,
    AuthModule
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
