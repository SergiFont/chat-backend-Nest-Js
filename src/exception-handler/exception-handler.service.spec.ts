import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionHandlerService } from './exception-handler.service';

describe('ExceptionHandlerService', () => {
  let service: ExceptionHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionHandlerService],
    }).compile();

    service = module.get<ExceptionHandlerService>(ExceptionHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
