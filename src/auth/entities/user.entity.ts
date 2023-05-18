import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column('text', {
    select: false
  })
  password: string;

  @ApiProperty()
  @Column('text', {
    unique: true
  })
  username: string;

  @ApiProperty()
  @Column('boolean', {
    default: true,
  })
  isactive: boolean;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ManyToMany(() => Room)
    @JoinTable()
    rooms?: Room[]

  // @BeforeInsert()
  //   checkFields() {
  //       this.email = this.email.toLowerCase().trim()
  //   }

  // @BeforeUpdate()
  //   checkFieldsUpdate() {
  //       this.checkFields()
  //   }
}
