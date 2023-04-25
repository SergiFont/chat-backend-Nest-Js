import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CommonService {
  private readonly logger = new Logger('CommonService');

  getStaticFile(file: string, directory: string) {
    const path = join(__dirname, directory, file);

    if (!existsSync(path))
      throw new BadRequestException(`No product: ${file} was found`);

    return path;
  }
}
