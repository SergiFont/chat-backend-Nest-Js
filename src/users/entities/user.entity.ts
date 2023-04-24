import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserImage } from "./user-images.entity";

@Entity({ name: 'fakeusers' })
export class FakeUser {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    username: string;

    @Column('text', {
        nullable: true
    })
    description: string;

    @Column('date')
    createdTime: Date

    @OneToMany(
        () => UserImage,
        userImage => userImage.user,
        { cascade: true, eager: true }
    )
    images?: UserImage[]

    @BeforeInsert()
    createDate() {
        this.createdTime = new Date
    }

}
