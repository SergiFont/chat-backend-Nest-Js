import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server 

  constructor(
    private readonly messagesWsService: MessagesWsService
    ) {}


  handleConnection(client: Socket) {
    // console.log('Client connected', client.id);
    this.messagesWsService.registerClient( client )

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() )

    // client.emit('message-from-server', {
    //   message: `Welcome ${payload.from}!`
    // })

    // client.broadcast.emit('message-from-server', {
    //   message: `${payload.from} has connected to the room`
    // })

  }
  
  handleDisconnect(client: Socket) {
    // console.log('Client disconnected', client.id);
    this.messagesWsService.removeClient( client.id )

  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient( client: Socket, payload: NewMessageDto) {

    // client.emit('message-from-server', {
    //   message: `Welcome ${payload.from}!`
    // })

    // this.wss.to()  Sent a message to a specific client ID or ROOM
    this.wss.emit('message-from-server', {
      from: payload.from,
      message: payload.message
    })

    }

}
