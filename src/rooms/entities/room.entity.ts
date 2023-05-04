import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @ApiProperty({
    example: '320a43ed-2856-43b1-8d36-46c9a127cda4',
    description: 'Room ID',
    uniqueItems: true
})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Example room',
    description: 'Room name',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: 'A common room',
    description: 'Room description',
    nullable: true
  })
  @Column('text', {
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'example_room',
    description: 'Room Slug',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: '2023-05-02 09:55:52.006',
    description: 'created time'
  })
  @Column('timestamp')
  createdTime: Date;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.name;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeInsert()
  createDate() {
    this.createdTime = new Date();
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
