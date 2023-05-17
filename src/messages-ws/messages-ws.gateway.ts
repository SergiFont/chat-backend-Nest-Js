import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { NewMessageDto } from './dto/new-message.dto';
import { MessageFromClient } from './dto/new-message.dto'
import { JwtPayload } from 'src/auth/interfaces';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server 

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
    ) {}


  async handleConnection(client: Socket): Promise<void> {

    const token = client.handshake.headers.authorization
    let payload: JwtPayload

    try {

      payload = this.jwtService.verify(token )
      await this.messagesWsService.registerClient( client, payload.id )

    } catch (error) {
      client.disconnect()
      return
    }
    
    

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() )

    // client.emit('message-from-server', {
    //   message: `Welcome ${payload.from}!`
    // })

    // client.broadcast.emit('message-from-server', {
    //   message: `${payload.from} has connected to the room`
    // })

  }
  
  handleDisconnect(client: Socket): void {
    console.log('client disconnected');
    this.messagesWsService.removeClient( client.id )

  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient( client: Socket, payload: MessageFromClient): void {
    // console.log(payload);
    // client.emit('message-from-server', {
    //   message: `Welcome ${payload.from}!`
    // })

    // this.wss.to()  // Sent a message to a specific client ID or ROOM
    this.wss.emit('message-from-server', {
      from: payload.from,
      message: payload.message
    })

    }

}
