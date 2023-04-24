import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FakeUser } from "./user.entity";


@Entity({name: 'user_images'})
export class UserImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;


    @ManyToOne(
        () => FakeUser,
        user => user.images,
        { onDelete: 'CASCADE'}
    )
    user: FakeUser

}