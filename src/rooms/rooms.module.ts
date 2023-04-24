import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    TypeOrmModule.forFeature([Room]), // importa el modelo TypeOrm y la aplica al Producto
    CommonModule,
  ],
  exports: [
    RoomsService, 
    TypeOrmModule
  ]
})
export class RoomsModule {}
