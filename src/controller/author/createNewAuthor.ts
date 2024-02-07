import { Request, Response } from 'express'
import { Author } from '../../entity/Author'
import { DatabaseConfig } from '../../dataSource'

export async function createNewAuthor(req: Request, res: Response) {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).send({
            message: 'Name and email are required',
        })
    }

    const authorRepository = DatabaseConfig.getRepository(Author)

    const authorExists = await authorRepository.findOne({
        where: {
            email,
        },
    })
    if (authorExists) {
        return res.status(400).send({
            message: 'Author with this email already exists',
        })
    }

    const newAuthor = authorRepository.create({
        name,
        email,
    })
    await authorRepository.save(newAuthor)

    return res.status(201).send({
        message: 'Author created successfully',
        data: newAuthor,
    })
}
