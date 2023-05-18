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

    public getUser( id: string ) {
        return this.list.find( user => user.id === id)
    }

    public getUsersRoom( room: string ) {
        return this.list.filter( user => user.room === room)
    }

    public deleteUser( id: string ) {
        const tempUser = this.getUser(id)
        this.list = this.list.filter( user => user.id !== id )

        return tempUser
    }

}