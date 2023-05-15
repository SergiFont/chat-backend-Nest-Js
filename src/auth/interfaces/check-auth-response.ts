import { User } from "../entities/user.entity";


export interface CheckAuthResponse {
    user: User,
    token: string
}