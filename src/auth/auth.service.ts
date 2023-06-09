import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { LoginUserDto, UpdateUserDto, CreateUserDto, CreateAdminDto } from './dto';
import { ExceptionHandlerService } from 'src/exception-handler/exception-handler.service';
import { isUUID } from 'class-validator';
import { RequestsResponse, LoginResponse, JwtPayload, ListResponse, CheckAuthResponse } from './interfaces';
import { PaginationDto } from 'src/rooms/dto/pagination.dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    private readonly jwtService: JwtService
  ) {}
    
  async create(createUserDto: CreateUserDto): Promise <User> {  
    try {
      
      const { password, email, username } = createUserDto
      const standardEmail = email.toLowerCase()
      
      const user = this.userRepository.create({
        username,
        email: standardEmail,
        password: bcrypt.hashSync(password, 10)
      })

      const newUser = await this.userRepository.save( user )

      return {
        ...newUser,
      }

    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error)
    }
  }

  async createAdmin( createAdminDto: CreateAdminDto ): Promise<void> {
    const { password, username, email } = createAdminDto
    const standardEmail = email.toLowerCase()

    const admin = this.userRepository.create({username, password: bcrypt.hashSync(password, 10), roles: ['admin'], email: standardEmail})
    await this.userRepository.save( admin )
  }

  
  async register( createUserDto: CreateUserDto ): Promise <LoginResponse> {

    const user = await this.create( createUserDto )

    return {
      user,
      token: this.getJwtToken({ id: user.id })
    }

  }

  async login(loginUserDto: LoginUserDto): Promise <LoginResponse> {

    const { password, email } = loginUserDto
    const standardEmail = email.toLowerCase()

    const user = await this.userRepository.findOne({
      where: { email: standardEmail },
      select: { email: true, password: true, id: true, username: true, isactive: true, roles: true }
    })

    if ( !user ) throw new UnauthorizedException('Credentials are not valid (email)')
    if ( !user.isactive ) throw new UnauthorizedException('User not active')

    if (!bcrypt.compareSync( password, user.password ) ) throw new UnauthorizedException('Credentials are not valid (password)')

    delete user.password

      return {
        user,
        token: this.getJwtToken({ id: user.id })
      }
  }
  
  
  async findBy(term: string, user: User): Promise<RequestsResponse> { // se puede buscar por ID o username
    const {token} = this.checkAuthStatus(user)
    let usersData: User[]
    
    if(isUUID(term)) usersData = await this.userRepository.findBy({ id: term })
    else {
      const queryBuilder = this.userRepository.createQueryBuilder('user')
      usersData = await queryBuilder
        .select()
        .where('UPPER(username) LIKE :username', {
          username: `%${term.toUpperCase()}%`,
        })
        .getMany()
    }
    
    if (!usersData) throw new NotFoundException(`User with term "${term}" not found`)
    
    return {
      user: usersData,
      token
    }
  }
  
  async findUserById( id: string ) {
    const user = await this.userRepository.findOneBy({id})
    return user
  }
  
  async update(targetId: string, updateUserDto: UpdateUserDto, user: User): Promise<RequestsResponse> {
    const {token} = this.checkAuthStatus(user)
    const requirerUser = await this.userRepository.findOneBy({ id: user.id })
    const standardEmail = updateUserDto.email?.toLowerCase()
    const userToModifie = await this.userRepository.preload({
      ...updateUserDto,
      id: targetId,
      email: standardEmail
    })
    
    if (requirerUser.id !== userToModifie.id ) throw new UnauthorizedException('Only the user can modify itself')
    
    if (!userToModifie) throw new NotFoundException(`User with id: ${targetId} not found`)
    
    try {
      await this.userRepository.save(userToModifie)
      return {
        user : [userToModifie],
        token
      }
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
  
  checkAuthStatus(user: User): CheckAuthResponse  {
    
    delete user.password
    
    return {
      user,
      token: this.getJwtToken({ id: user.id })
    }
    
  }
  async list(user: User, paginationDto: PaginationDto): Promise<ListResponse> {

    const { limit = 10, offset = 0 } = paginationDto

    const {token} = this.checkAuthStatus(user)
    const usersData = await this.userRepository.find({
      select: { email: true, username: true},
      take: limit,
      skip: offset
    })
    return {user: usersData, token}
  }

  getNumberUsers() {
    return this.userRepository.count()
  }
}
