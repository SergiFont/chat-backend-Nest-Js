import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { Request } from "express";



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
)