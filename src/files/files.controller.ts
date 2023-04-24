import { diskStorage } from 'multer';
import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
    ) {}

  @Get('user/:imageName')
  findProductImage(
    @Res() res: Response, // este decorador rompe la cadena de funcionamiento interna de Node. Es decir, se salta los interceptores globales y las restricciones por defecto de nest, entre otros. Usar con precaución
    // tomo el control yo de la respuesta, y dicto como quiero que se emita
    @Param('imageName') imageName: string
    ) {
    const path = this.filesService.getFile( imageName, '../../static/userImages' )

    res.sendFile( path )
  }

  @Post('user')
  @UseInterceptors( FileInterceptor('image', {
    fileFilter,
    storage: diskStorage({
      destination: './static/userImages',
      filename: fileNamer
    })
  }) )

  uploadUserImage(
    @UploadedFile() file: Express.Multer.File,
  ){

    if ( !file ) {
      throw new BadRequestException('Make sure that you are passing an image file')
    }

    const secureUrl = `${ this.configService.get('HOST_API')}/files/userImages/${ file.filename}`

    return {
      secureUrl
    }
  }
}
