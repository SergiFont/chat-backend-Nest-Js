import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('user')
  @UseInterceptors( FileInterceptor('image', {
    fileFilter,
    storage: diskStorage({
      destination: './static/userImages',
      filename: fileNamer
    })
  }) )
  uploadUserImage(
    @UploadedFile() image: Express.Multer.File,
  ){

    if ( !image ) {
      throw new BadRequestException('Make sure that the file is an image')
    }

    return {
      fileName: image.originalname
    }
  }
}
