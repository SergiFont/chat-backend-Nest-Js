import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    CommonModule,
    ConfigModule
  ]
})
export class FilesModule {}
