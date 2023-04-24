import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { TestingModule } from '@nestjs/testing';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
    TestingModule
  ],
  exports: [TypeOrmModule]
})
export class AuthModule {}
