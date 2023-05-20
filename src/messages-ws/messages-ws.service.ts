import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWs } from './class/userWs';
import { UserList } from './class/userList';
import { PrivateMessage } from './interfaces';
import { websocketId } from './types/websocket-id.type';

@Injectable()
export class MessagesWsService {
  
    private connectedClients: UserList = new UserList()
    private wss: Server

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    setServer ( server: Server): void {
        this.wss = server
    }

    
    async registerClient( client: Socket, id: string ) {
        const user = await this.userRepository.findOneBy({ id })
        if ( !user ) throw new UnauthorizedException('User not found')
        if ( !user.isactive ) throw new UnauthorizedException('User not active')
        const userWs = new UserWs( client.id )
        Object.assign( userWs, user)

        this.connectedClients.add( userWs )
        console.log(this.getConnectedClients());
    }
    
    removeClient( clientId: string ) {
        this.connectedClients.deleteUser(clientId)
    }

    getConnectedClients(): UserWs[] {
        return this.connectedClients.getUsersInRoom()
    }

    getClient( wsId: string ) {
        const client = this.connectedClients.getUser( wsId )
    }

    sendPrivateMessage( id: websocketId, privateMessage: PrivateMessage ): void {
        const { body, from } = privateMessage
        const payload = {
            from,
            body
        }

        this.wss.in( id ).emit( 'private-message', payload )
    }
    
    // private checkUserConnection( user: User ) {
        
        //     for ( const clientId of Object.keys( this.connectedClients )) {
            
            //         const connectedClient = this.connectedClients[clientId]
            
            //         if ( connectedClient.user.id === user.id) {
                //             connectedClient.socket.disconnect()
                //             break
                //         }
                
    //     }
    
}
