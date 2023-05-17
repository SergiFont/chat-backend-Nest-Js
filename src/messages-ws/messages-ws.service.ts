import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConnectedClients } from './interfaces';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesWsService {
  
    private connectedClients: ConnectedClients = {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async registerClient( client: Socket, id: string ) {
        const user = await this.userRepository.findOneBy({ id })
        if ( !user ) throw new UnauthorizedException('User not found')
        if ( !user.isactive ) throw new UnauthorizedException('User not active')

        // this.checkUserConnection( user )

        this.connectedClients[client.id] = {
            socket: client,
            user
        }

    }

    removeClient( clientId: string ) {
        delete this.connectedClients[clientId]
    }

    getConnectedClients(): string[] {
        return Object.keys( this.connectedClients )

    }

    // private checkUserConnection( user: User ) {

    //     for ( const clientId of Object.keys( this.connectedClients )) {

    //         const connectedClient = this.connectedClients[clientId]

    //         if ( connectedClient.user.id === user.id) {
    //             connectedClient.socket.disconnect()
    //             break
    //         }
            
    //     }

    // }

}
