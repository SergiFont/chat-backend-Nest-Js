import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FakeUser } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImage } from './entities/user-images.entity';
import { ExceptionHandlerService } from 'src/exception-handler/exception-handler.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(FakeUser)
    private readonly userRepository: Repository<FakeUser>,

    @InjectRepository(UserImage) // insercion de la entidad Product
    private readonly userImageRepository: Repository<UserImage>,

    private readonly exceptionHandlerService: ExceptionHandlerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { images = [], ...userDetails } = createUserDto;

      const user = this.userRepository.create({
        ...userDetails,
        images: images.map((image) =>
          this.userImageRepository.create({ url: image }),
        ),
      }); // crea instancia del usero
      await this.userRepository.save(user); // graba la instancia en la base de datos

      return { ...user, images };
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(term: string) {
    let user: FakeUser;

    if (isUUID(term)) user = await this.userRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.userRepository.createQueryBuilder('prod');
      user = await queryBuilder
        .where('UPPER(username) =:username', {
          username: term.toUpperCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!user)
      throw new NotFoundException(`User with term "${term}" not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
      images: [],
    });

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userRepository.delete(id);
    return 'User deleted';
  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('user');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.exceptionHandlerService.handleDbExceptions(error);
    }
  }
}
