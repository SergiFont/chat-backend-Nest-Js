import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesWsController } from './messages-ws.controller';

@Module({
  providers: [MessagesWsGateway, MessagesWsService, ],
  imports: [AuthModule],
  controllers: [MessagesWsController]
})
export class MessagesWsModule {}
