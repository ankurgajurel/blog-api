import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Blog } from './Blog'

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Blog, (blog) => blog.authorId)
    blogs: Blog[]
}
