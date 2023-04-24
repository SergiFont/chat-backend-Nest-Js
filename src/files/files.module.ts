import { Module } from '@nestjs/common';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    CommonModule,
    ConfigModule
  ]
})
export class FilesModule {}
