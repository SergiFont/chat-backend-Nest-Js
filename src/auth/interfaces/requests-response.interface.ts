import { User } from "../entities/user.entity";


export interface RequestsResponse {
    user: User[],
    token: string
}