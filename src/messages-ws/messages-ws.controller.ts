import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { PrivateMessage } from './interfaces';
import { websocketId } from './types/websocket-id.type';
import { Auth } from 'src/auth/decorators';
import { MessagesWsGateway } from './messages-ws.gateway';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Websocket')
@Controller()
export class MessagesWsController {

    constructor(
        private readonly messagesWsService: MessagesWsService,
        private readonly gateway: MessagesWsGateway
    ) {}

    @Post('messages/:id')
    @Auth()
    @ApiResponse({status: 200 })
    sendMessage( @Param('id') id: websocketId, @Body() privateMessage: PrivateMessage ){

        // console.log(id);
        // console.log(privateMessage);
        this.gateway.sendPrivateMessage( id, privateMessage )

    }

    // @Get('users')
    // @Auth()
    // getUserList() {

    //     return this.messagesWsService.getConnectedClients()

    // }

}
