import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FakeUser } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserImage } from './entities/user-images.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([FakeUser, UserImage]),
    CommonModule
  ],
  exports: [
    UsersService,
    TypeOrmModule
    ]
})
export class UsersModule {}
