import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageFromClient } from './dto/new-message.dto'
import { JwtService } from '@nestjs/jwt';
import { ListRequest, LoginWsPayload, PrivateMessage } from './interfaces';
import { websocketId } from './types/websocket-id.type';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server 

  constructor(
    private readonly messagesWsService: MessagesWsService,
    ) {}

    afterInit( server: Server): void {
      this.messagesWsService.setServer( server )
    }

  async handleConnection(client: Socket): Promise<void> {

    console.log('client connected');
    console.log(client.id);
    

  }
  
  handleDisconnect(client: Socket): void {
    console.log('client disconnected');
    this.messagesWsService.removeClient( client.id )
    client.removeAllListeners()
    
    // this.wss.emit( 'active-users', this.messagesWsService.getConnectedClients() )

  }

  @SubscribeMessage('configuring-user')
  configureUser( client: Socket, payload: LoginWsPayload) {

    try {
      // this.messagesWsService.removeClient( client.id )
      this.messagesWsService.registerClient( client, payload.id )
      return 'hello'
    } catch (error) {
      console.log(error);
    }
    

  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient( client: Socket, payload: MessageFromClient): void {

    console.log(payload);
    this.wss.emit('message-from-server', {
      from: payload.from,
      message: payload.message
    })
    }

  @SubscribeMessage('ask-connected-clients')
  handleListRequest( client: Socket ) {

    this.wss.in( client.id ).emit( 'deliver-connected-clients', this.messagesWsService.getConnectedClients())
    console.log(this.messagesWsService.getConnectedClients());
    console.log('List sent');
  }

  sendPrivateMessage( id: websocketId, privateMessage: PrivateMessage ) {
    const { body, from } = privateMessage
    const payload = {
        from,
        body
    }
    // console.log(privateMessage);
    // console.log(payload);
    // console.log(payload);

    this.wss.in( id ).emit( 'private-message', payload )
}
}
