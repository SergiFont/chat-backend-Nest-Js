import { diskStorage } from 'multer';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('userImage/:imageName')
  @ApiResponse({ status: 200, description: 'Returns an image' })
  @ApiResponse({ status: 400, description: 'Bad request, no file was found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  findProductImage(
    @Res() res: Response, // este decorador rompe la cadena de funcionamiento interna de Node. Es decir, se salta los interceptores globales y las restricciones por defecto de nest, entre otros. Usar con precaución
    // tomo el control yo de la respuesta, y dicto como quiero que se emita
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticFile(
      imageName
    );

    res.sendFile(path);
  }

  @Post('upload-image')
  @ApiResponse({ status: 201, description: 'Uploads an image' })
  @ApiResponse({ status: 400, description: 'Bad request, no image or valid image is send' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter,
      storage: diskStorage({
        destination: './static/userImages',
        filename: fileNamer,
      }),
    }),
  )
  async uploadUserImage(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadStaticFile(file)
  }
}
