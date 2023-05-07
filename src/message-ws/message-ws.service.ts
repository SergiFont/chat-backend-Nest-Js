import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';

import { ConnectedClients } from './interfaces/ConnectedClients.infertace';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class MessageWsService {

    // private connectedClients: ConnectedClients = {}
    // private clients: string[] = []

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User> // se podria usar userService y así tenerlo todo centralizado
    ) {}

    disconnect( client: Socket ) {
            console.log('Client disconnected');
    }

    message( client: Socket, wss: Server ) {
        client.on('message', ( payload: { from: string, message: string } ) => {
            console.log('Message recieved', payload);

            wss.emit('new-message', payload)

        })
    }



    // async registerClient ( client: Socket, userId: string ) {
    //     console.log(userId);

    //     const user = await this.userRepository.findOneBy({ id: userId })
    //     if ( !user ) throw new Error('User not found')
    //     if ( !user.isactive ) throw new Error('User not active')

    //     this.checkUserConnection( user )

    //     this.connectedClients[client.id] = {
    //         socket: client,
    //         user
    //     }
    //     this.clientsList( client )
    //     console.log(this.clients);
        
    // }

    // removeClient ( clientId: string) {
    //     delete this.connectedClients[clientId]
    // }

    // getClientList(): string [] {
    //     return this.clients
    // }

    // getConnectedClients(): string[] {
        
    //     return Object.keys( this.connectedClients )
    // }

    // clientsList( client: Socket ): void {
    //     this.clients.push(this.getUserFullName(client.id))
    // }

    // deleteClientFromList(clientName: string) {
    //     const client = this.clients.findIndex( element => {
    //         console.log(element);
    //         return clientName === element
    //     })
    //     this.clients.splice(client, 1)
    //     console.log(this.clients);
    // }

    // getUserFullName( socketId: string ) {
    //     return this.connectedClients[socketId].user.fullname
    // }

    // private checkUserConnection( user: User) {
    //     for (const clientId of Object.keys( this.connectedClients )) {

    //         const connectedClient = this.connectedClients[clientId]

    //         if ( connectedClient.user.id === user.id) {
    //             connectedClient.socket.disconnect()
    //             break
    //         }
    //     }
    // }

}
