import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';


@Injectable()
export class FilesService {

    constructor(
        private readonly commonService: CommonService
    ){}
  
    getFile( file: string, directory: string ) {
        return this.commonService.getStaticFile( file, directory )
    }

}
