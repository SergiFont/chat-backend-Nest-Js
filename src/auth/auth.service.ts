import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { ExceptionHandlerService } from 'src/exception-handler/exception-handler.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    private readonly jwtService: JwtService
  ) {}
    
  async create(createUserDto: CreateUserDto): Promise <Object> {  
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
        token: this.getJwtToken({ id: user.id })
      }

    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error)
    }
  }

  async list(user: User): Promise<Object> {
    const {token} = await this.checkAuthStatus(user)
    const usersData = await this.userRepository.find({
      select: { email: true, username: true}
    })
    return {usersData, token}
  }

  async findOne(term: string, user: User): Promise<Object> { // se puede buscar por ID o username
    const {token} = await this.checkAuthStatus(user)
    let userData: User

    if(isUUID(term)) userData = await this.userRepository.findOne({
      where: { id: term },
      select: { email: true, username: true}
    })
    else {
      userData = await this.userRepository.findOne({
        where: {username: term},
        select: {email: true, username: true}
        
      })
      // const queryBuilder = this.userRepository.createQueryBuilder('user')
      // user = await queryBuilder
      //   .select()
      //   .where('UPPER(username) =:username', {
      //     username: term.toUpperCase(),
      //   })
      //   .getOne()
    }

    if (!userData) throw new NotFoundException(`User with term "${term}" not found`)

    return {
      ...userData,
      token
    }
  }
  

  async login(loginUserDto: LoginUserDto): Promise <Object> {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, username: true, isactive: true, roles: true }
    })

    if ( !user )
    throw new UnauthorizedException('Credentials are not valid (email)')

    if (!bcrypt.compareSync( password, user.password ) ) throw new UnauthorizedException('Credentials are not valid (password)')

    delete user.password

      return {
        user,
        token: this.getJwtToken({ id: user.id })
      }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userData = await this.userRepository.preload({
      id,
      ...updateUserDto
    })

    if (!userData) throw new NotFoundException(`User with id: ${id} not found`)

    try {
      await this.userRepository.save(userData)
      return userData
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error)
    }
  }

  private getJwtToken( payload: JwtPayload ): string {

    const token = this.jwtService.sign( payload )
    return token
}

async deleteAllUsers() {
  const query = this.userRepository.createQueryBuilder('rooms');

  try {
    return await query.delete().where({}).execute();
  } catch (error) {
    this.exceptionHandlerService.handleDbExceptions(error);
  }
}

async checkAuthStatus(user: User) {

  delete user.password
  delete user.roles

  return {
    ...user,
    token: this.getJwtToken({ id: user.id })
  }

}
}
