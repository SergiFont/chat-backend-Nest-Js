import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { ExceptionHandlerService } from 'src/exception-handler/exception-handler.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    private readonly jwtService: JwtService
  ) {}
    
  async create(createUserDto: CreateUserDto) {  
    try {

      const { password, ...userData } = createUserDto
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      await this.userRepository.save( user )
      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ email: user.email })
      }

    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error) // TODO crear un Modulo para este tipo de manejo de errores
    }
  }
  

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true}
    })

    if ( !user )
    throw new UnauthorizedException('Credentials are not valid (email)')

    if (!bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)')

      return {
        ...user,
        token: this.getJwtToken({ email: user.email })
      }
  }

  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload )
    return token
}
}
