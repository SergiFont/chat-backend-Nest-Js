import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { ExceptionHandlerModule } from 'src/exception-handler/exception-handler.module';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    TypeOrmModule.forFeature([Room, User]), // importa el modelo TypeOrm y la aplica al Producto
    ExceptionHandlerModule,
    AuthModule
  ],
  exports: [
    RoomsService, 
    TypeOrmModule
  ],
})
export class RoomsModule {}
