import { join } from 'path';
import { existsSync } from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  constructor() {}

  getStaticFile(imageName: string) {
    const path = join(__dirname, '../../static/userImages', imageName);

    if (!existsSync(path))
      throw new BadRequestException(`No product: ${imageName} was found`);

    return path;
  }
}
