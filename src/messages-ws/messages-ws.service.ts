import { Injectable } from '@nestjs/common';
import { CreateMessagesWDto } from './dto/create-messages-w.dto';
import { UpdateMessagesWDto } from './dto/update-messages-w.dto';
import { ConnectedClients } from './interfaces/ConnectedClients.interface';
import { Socket } from 'socket.io';

@Injectable()
export class MessagesWsService {
  
    private connectedClients: ConnectedClients = {}

    registerClient( client: Socket ) {

        this.connectedClients[client.id] = client

    }

    removeClient( clientId: string ) {
        delete this.connectedClients[clientId]
    }

    getConnectedClients(): number {

        return Object.keys( this.connectedClients ).length

    }

}
