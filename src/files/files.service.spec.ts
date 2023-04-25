import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { FilesService } from './files.service';
import { CommonService } from '../common/common.service';

describe('FilesService', () => {
  let filesService: FilesService;
  let commonService: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService, CommonService],
    }).compile();

    filesService = module.get<FilesService>(FilesService);
    commonService = module.get<CommonService>(CommonService);
  });

  describe('getStaticProductImage', () => {
    it('should return the path to the image if it exists', () => {
      const imageName = 'image.png';
      const expectedPath = '/path/to/image.png';
      jest
        .spyOn(filesService, 'getStaticFile')
        .mockReturnValue(expectedPath);

      const path = filesService.getStaticFile(imageName);

      expect(path).toEqual(expectedPath);
    });

    it('should throw BadRequestException if the image does not exist', () => {
      const imageName = 'nonexistent.png';

      jest
        .spyOn(filesService, 'getStaticFile')
        .mockImplementation(() => {
          throw new BadRequestException(`No product: ${imageName} was found`);
        });

      expect(() => filesService.getStaticFile(imageName)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('getFile', () => {
    it('should return the contents of a file', () => {
      const file = 'image.jpg';


      jest
        .spyOn(commonService, 'getStaticFile')
        .mockReturnValue("C:\\Users\\Sergi5\\Desktop\\chat-project\\static\\userImages\\image.jpg");

      expect(filesService.getStaticFile(file)).toEqual("C:\\Users\\Sergi5\\Desktop\\chat-project\\static\\userImages\\image.jpg");
    });
  });
});
