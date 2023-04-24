import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CommonService } from './../common/common.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      
      const user = this.userRepository.create( createUserDto )

      await this.userRepository.save( user )

      return user

    } catch (error) {
      this.commonService.handleDbExceptions(error)
    }
  }
}
