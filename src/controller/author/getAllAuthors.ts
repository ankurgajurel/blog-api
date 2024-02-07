import { Request, Response } from 'express'
import { DatabaseConfig } from '../../dataSource'
import { Author } from '../../entity/Author'

export async function getAllAuthors(req: Request, res: Response) {
    const authorRepository = DatabaseConfig.getRepository(Author)

    const authors = await authorRepository.find()

    res.status(200).send({
        message: 'Authors data',
        data: authors,
    })

    return
}
