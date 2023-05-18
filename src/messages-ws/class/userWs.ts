import { User } from "src/auth/entities/user.entity";
import { Entity } from "typeorm";

export class UserWs extends User {

    public wsId: string;
    public room: string;
    public name: string;

    constructor( wsId: string, room: string) {
        super();
        this.wsId = wsId
        this.room = room
        this.name = this.username
    }

}