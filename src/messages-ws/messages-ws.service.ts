import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWs } from './class/userWs';
import { UserList } from './class/userList';

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

        try {
            const user = await this.userRepository.findOneBy({ id })
            if ( !user ) throw new UnauthorizedException('User not found')
            if ( !user.isactive ) throw new UnauthorizedException('User not active')
            const userWs = new UserWs( client.id )
            Object.assign( userWs, user)
    
            this.connectedClients.add( userWs )
            console.log(this.getConnectedClients());
            
        } catch (error) {
            console.log(error);
        }
    }
    
    removeClient( clientId: string ) {
        try {
            this.connectedClients.deleteUser(clientId)
            
        } catch (error) {
            console.log(error);
        }
    }

    getConnectedClients(): UserWs[] {
        try {
            return this.connectedClients.getUsersInRoom()
            
        } catch (error) {
            console.log(error);
        }
    }

    getClient( wsId: string ) {
        const client = this.connectedClients.getUser( wsId )
    }

    // sendPrivateMessage( id: websocketId, privateMessage: PrivateMessage ): void {
    //     try {
    //         const { body, from } = privateMessage
    //         const payload = {
    //             from,
    //             body
    //         }
    
    //         this.wss.in( id ).emit( 'private-message', payload )
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    // private checkUserConnection( user: User ) {
        
        //     for ( const clientId of Object.keys( this.connectedClients )) {
            
            //         const connectedClient = this.connectedClients[clientId]
            
            //         if ( connectedClient.user.id === user.id) {
                //             connectedClient.socket.disconnect()
                //             break
                //         }
                
    //     }
    
}
