import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    publishedDate: string

    @Column()
    authorId: number

    @Column()
    content: string
}
