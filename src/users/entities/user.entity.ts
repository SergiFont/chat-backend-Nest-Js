import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

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

    @Column('timestamp')
    createdTime: Date

}
