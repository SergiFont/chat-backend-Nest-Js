import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class UserRequestGuard implements CanActivate {
  
  constructor( 
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService
    ) {}
  
  async canActivate( context: ExecutionContext ): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader( request )

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, { secret: this.configService.get('JWT_SECRET') }
      )
      
      const user = await this.authService.findUserById(payload.id)
      if( !user ) throw new UnauthorizedException('User does not exists')

      request['user'] = user
      
    } catch (error) {
      throw new UnauthorizedException() // este Unauthorized no es el que salta
    }


    return Promise.resolve( true );
  }

  private extractTokenFromHeader( request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

}
