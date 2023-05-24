import { User } from "src/auth/entities/user.entity";

export class UserWs extends User {

    public wsId: string;
    public room: string;
    public name: string;

    constructor( wsId: string ) {
        super();
        this.wsId = wsId
        this.room = 'not yet'
    }

}