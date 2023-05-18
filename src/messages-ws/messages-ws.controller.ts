import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { PrivateMessage } from './interfaces';
import { websocketId } from './types/websocket-id.type';

@Controller('messages')
export class MessagesWsController {

    constructor(
        private readonly messagesWsService: MessagesWsService,
    ) {}

    @Post(':id')
    sendMessage( @Param('id') id: websocketId, @Body() privateMessage: PrivateMessage ) {

        return this.messagesWsService.sendPrivateMessage( id, privateMessage )

    }

}
