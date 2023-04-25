import { Module } from '@nestjs/common';
import { ExceptionHandlerService } from './exception-handler.service';

@Module({
  controllers: [],
  providers: [ExceptionHandlerService],
  exports: [ExceptionHandlerService]
})
export class ExceptionHandlerModule {}
