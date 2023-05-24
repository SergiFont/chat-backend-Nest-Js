import { join } from 'path';
import { existsSync } from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  getStaticFile(imageName: string) {
    const path = join(__dirname, '../../static/userImages', imageName);

    if (!existsSync(path))
      throw new BadRequestException(`No product: ${imageName} was found`);

    return path;
  }

  uploadStaticFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'Make sure that you are passing an image file',
      );
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/userImage/${
      file.filename
    }`;

    return {
      secureUrl,
    };
  }
}
