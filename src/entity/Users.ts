import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string
}