import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { validate as isUUID} from 'uuid'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImage } from './entities/user-images.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserImage) // insercion de la entidad Product
    private readonly userImageRepository: Repository<UserImage>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { images  = [], ...userDetails } = createUserDto

      const user = this.userRepository.create({
        ...userDetails,
        images: images.map( image => this.userImageRepository.create({ url: image }))
      }); // crea instancia del usero
      await this.userRepository.save( user ) // graba la instancia en la base de datos

      return {...user, images};
      
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(term: string) {
    let user: User;

    if ( isUUID(term) ) user = await this.userRepository.findOneBy({ id: term })
    else {
      const queryBuilder = this.userRepository.createQueryBuilder('prod');
      user = await queryBuilder
        .where('UPPER(username) =:username', {
          username: term.toUpperCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne()
    }  

    if ( !user ) throw new NotFoundException(`User with term "${term}" not found`)
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
      images: []
    })

    if ( !user ) throw new NotFoundException(`User with id: ${id} not found`)

    try {
      await this.userRepository.save(user)
      return user;
      
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  async remove(id: string) {
    await this.findOne( id )
    await this.userRepository.delete(id)
    return 'User deleted'
  }

  private handleDbExceptions ( error: any ) {
    if ( error.code === '23505' )
        throw new BadRequestException( error.detail )

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  } 
}
