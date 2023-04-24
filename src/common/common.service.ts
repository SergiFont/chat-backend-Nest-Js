import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CommonService {

    getStaticFile( file: string, directory: string ) {

        const path = join( __dirname, directory, file )

        if ( !existsSync(path) ) throw new BadRequestException(`No product: ${ file } was found`)

        return path
    }
}
