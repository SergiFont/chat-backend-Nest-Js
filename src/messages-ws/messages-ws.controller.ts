import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { PrivateMessage } from './interfaces';
import { websocketId } from './types/websocket-id.type';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller()
export class MessagesWsController {

    constructor(
        private readonly messagesWsService: MessagesWsService,
    ) {}

    @Post('messages/:id')
    @Auth()
    sendMessage( @Param('id') id: websocketId, @Body() privateMessage: PrivateMessage ): void {

        return this.messagesWsService.sendPrivateMessage( id, privateMessage )

    }

    @Get('users')
    @Auth()
    getUserList() {

        return this.messagesWsService.getConnectedClients()

    }

}
