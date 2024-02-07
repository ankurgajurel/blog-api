import { Request, Response } from 'express'
import { Author } from '../../entity/Author'
import { DatabaseConfig } from '../../dataSource'

export async function createNewAuthor(req: Request, res: Response) {
    const { name, email } = req.body

    if (!name || !email) {
        res.status(400).send({
            message: 'Name and email are required',
        })

        return
    }

    const authorRepository = DatabaseConfig.getRepository(Author)

    const authorExists = await authorRepository.findOne({
        where: {
            email,
        },
    })
    if (authorExists) {
        res.status(400).send({
            message: 'Author with this email already exists',
        })

        return
    }

    const newAuthor = authorRepository.create({
        name,
        email,
    })
    await authorRepository.save(newAuthor)

    res.status(201).send({
        message: 'Author created successfully',
        data: newAuthor,
    })

    return
}
