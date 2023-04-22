import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    TypeOrmModule.forFeature([Room]) // importa el modelo TypeOrm y la aplica al Producto
  ],
  exports: [RoomsService, TypeOrmModule]
})
export class RoomsModule {}
