import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class ExceptionHandlerService {

    private readonly logger = new Logger('UsersService');

    handleDbExceptions(error: any): never {
        if (error.code === '23505') throw new BadRequestException(error.detail);
    
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Unexpected error, check server logs',
        );
      }
}
