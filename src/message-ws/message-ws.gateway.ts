import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';

import { MessageWsService } from './message-ws.service';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateUserDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server

  constructor(
    private readonly messageWsService: MessageWsService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
    ) {}

  async handleConnection( client: Socket ) {


    // const token = client.handshake.headers.authentication as string
    // let payload: JwtPayload

    // try {
    //   payload = this.jwtService.verify( token )
    //   await this.messageWsService.registerClient ( client, payload.id )
    // } catch (error) {
    //   client.disconnect()
    //   return
    // }
    
    // this.wss.emit( 'clients-updated', this.messageWsService.getClientList() )

  }

  handleDisconnect(client: Socket) {
    const clientName = this.messageWsService.getUserFullName(client.id)
    this.messageWsService.deleteClientFromList(clientName)
    this.messageWsService.removeClient( client.id )


    this.wss.emit( 'clients-updated', this.messageWsService.getClientList() )

  }

  @SubscribeMessage('message-from-client')

  onUserRegister( client: Socket, payload: CreateUserDto) {

    this.authService.findOne()

  }



  onMessageFromClient( client: Socket, payload: NewMessageDto ) {
    
    // Emite a todos INCLUIDO a si mismo
    this.wss.emit('message-from-server', {
      fullName: this.messageWsService.getUserFullName( client.id ),
      message: payload.message || 'no-message'
    })
    
  }
  
  // Emite únicamente al cliente!
  // client.emit('message-from-server', {
  //   fullName: 'OREWA',
  //   message: payload.message || 'no-message'
  // })

  // Emite a todos MENOS, al cliente emisor
  // client.broadcast.emit('message-from-server', {
  //   fullName: 'OREWA',
  //   message: payload.message || 'no-message'
  // })
}
