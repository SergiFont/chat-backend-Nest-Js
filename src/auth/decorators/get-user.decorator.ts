import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth.service";



export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {
        
        const req: Request = ctx.switchToHttp().getRequest();
        const user = req.user

        if ( !user )
            throw new InternalServerErrorException('User not found (request)')

        return ( !data )
            ? user
            : user[data]
    }
) // no puedo inyectar el authService en una función. Tendré que pasar la responsabilidad de este decorador al guard user-request