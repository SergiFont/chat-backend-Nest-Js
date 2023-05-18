import { UserWs } from "./userWs";

export class UserList {

    private list: UserWs[] = []

    constructor() {}

    public add( user: UserWs): UserWs {

        this.list.push( user )
        console.log(this.list);
        return user

    }

    public updateName( wsId: string, name: string ) {

        for ( let user of this.list) {

            if ( user.wsId === wsId ) user.name = name
            break
            // se podria hacer haciendo consulta en base de datos
        }

        console.log('--------Updating user---------');
        console.log(this.list);

    }

    public getList() {
        return this.list
    }

    public getUser( wsId: string ) {
        return this.list.find( user => user.wsId === wsId)
    }

    public getUsersInRoom( room: string ) {
        return this.list.filter( user => user.room === room)
    }

    public deleteUser( wsId: string ) {
        const tempUser = this.getUser(wsId)
        this.list = this.list.filter( user => user.wsId !== wsId )

        return tempUser
    }

}