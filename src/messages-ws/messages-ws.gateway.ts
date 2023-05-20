import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageFromClient } from './dto/new-message.dto'
import { JwtPayload } from 'src/auth/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ListRequest, LoginWsPayload } from './interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server 

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
    ) {}

    afterInit( server: Server): void {
      this.messagesWsService.setServer( server )
    }

  async handleConnection(client: Socket): Promise<void> {

    console.log('client connected');
    // this.messagesWsService.registerClient( client )
    // const token = client.handshake.headers.authorization
    // let payload: JwtPayload

    // try {

    //   payload = this.jwtService.verify( token )
    //   await this.messagesWsService.registerClient( client, payload.id )
    //   this.messagesWsService.getClient( client.id )
    //   this.wss.emit( 'active-users', this.messagesWsService.getConnectedClients() )
      

    // } catch (error) {
    //   console.log({error: error.message});
    //   console.log({generalError: error});
    //   client.disconnect()
    //   return
    // }
    
    

    // this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() )

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
    
    // this.wss.emit( 'active-users', this.messagesWsService.getConnectedClients() )

  }

  @SubscribeMessage('configuring-user')
  configureUser( client: Socket, payload: LoginWsPayload) {

    try {
      this.messagesWsService.registerClient( client, payload.id )
      return 'hello'
    } catch (error) {
      console.log(error);
    }
    

  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient( client: Socket, payload: MessageFromClient): void {

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
}
