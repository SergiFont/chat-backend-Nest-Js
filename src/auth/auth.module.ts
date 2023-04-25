import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { ExceptionHandlerModule } from 'src/exception-handler/exception-handler.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ExceptionHandlerModule
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
