import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class UserImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;


    @ManyToOne(
        () => User,
        user => user.images,
        { onDelete: 'CASCADE'}
    )
    user: User

}