import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ){

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate( payload: JwtPayload ): Promise<User> {

        const { id } = payload

        const user = await this.userRepository.findOneBy({ id })

        if ( !user )
            throw new UnauthorizedException('Token not valid')

        if ( !user.isactive )
            throw new UnauthorizedException('User is inactive, talk with an admin')

        return user;
    }

}