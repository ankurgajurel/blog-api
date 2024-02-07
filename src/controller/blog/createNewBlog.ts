import { Request, Response } from 'express'
import { DatabaseConfig } from '../../dataSource'
import { Author } from '../../entity/Author'
import { Blog } from '../../entity/Blog'

export async function createNewBlog(req: Request, res: Response) {
    const { title, content, authorId } = req.body

    if (!title || !content || !authorId) {
        res.status(400).send({
            message: 'Title, content and author id are required',
        })

        return
    }

    const authorRepository = DatabaseConfig.getRepository(Author)

    const author = await authorRepository.findOne({
        where: {
            id: authorId,
        },
    })

    if (!author) {
        res.status(404).send({
            message: 'Author not found',
        })

        return
    }

    const blogRepository = DatabaseConfig.getRepository(Blog)

    const existingBlog = await blogRepository.findOne({
        where: {
            title,
        },
    })

    if (existingBlog) {
        res.status(409).send({
            message: 'Blog already exists',
        })

        return
    }

    const newBlog = blogRepository.create({
        title,
        authorId,
        publishedDate: new Date().toISOString(),
        content,
    })

    await blogRepository.save(newBlog)

    res.status(201).send({
        message: 'New blog created',
        data: newBlog,
    })

    return
}
