import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { BadRequestException } from '@nestjs/common';
import { CommonService } from '../common/common.service';

describe('FilesController', () => {
  let filesController: FilesController;
  let filesService: FilesService;
  let configService: ConfigService;
  let commonService: CommonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService, ConfigService, CommonService],
    }).compile();

    filesController = module.get<FilesController>(FilesController);
    filesService = module.get<FilesService>(FilesService);
    configService = module.get<ConfigService>(ConfigService);
    commonService = module.get<CommonService>(CommonService);
  });

  describe('findProductImage', () => {
    it('should send the product image file', () => {
      const res = { sendFile: jest.fn() };
      const imageName = 'test.png';
      const path = '/path/to/image';
      jest.spyOn(filesService, 'getFile').mockReturnValue(path);

      filesController.findProductImage(res as any, imageName);

      expect(res.sendFile).toHaveBeenCalledWith(path);
    });
  });

  describe('uploadUserImage', () => {
    it('should upload the user image and return a secure URL', async () => {
      const file = { filename: 'test.png' } as Express.Multer.File;
      const secureUrl = 'https://example.com/files/userImages/test.png';
      jest.spyOn(configService, 'get').mockReturnValue('https://example.com');

      const result = await filesController.uploadUserImage(file);

      expect(result).toEqual({ secureUrl });
    });

    it('should throw BadRequestException if no file is provided', async () => {
      const file = undefined;

      await expect(filesController.uploadUserImage(file)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
