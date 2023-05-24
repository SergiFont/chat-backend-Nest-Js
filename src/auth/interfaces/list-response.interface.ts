import { User } from "../entities/user.entity";


export interface ListResponse {
    user: User[],
    token: string
}