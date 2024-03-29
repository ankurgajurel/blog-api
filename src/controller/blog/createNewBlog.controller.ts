import { Request, Response } from 'express'
import { DatabaseConfig } from '../../dataSource'
import { Author } from '../../entity/Author.entity'
import { Blog } from '../../entity/Blog.entity'

export async function createNewBlog(req: Request, res: Response) {
    const { title, content, authorId } = req.body

    if (!title || !content || !authorId) {
        return res.status(400).send({
            message: 'Title, content and author id are required',
        })
    }

    const authorRepository = DatabaseConfig.getRepository(Author)

    const author = await authorRepository.findOne({
        where: {
            id: authorId,
        },
    })

    if (!author) {
        return res.status(404).send({
            message: 'Author not found',
        })
    }

    const blogRepository = DatabaseConfig.getRepository(Blog)

    const existingBlog = await blogRepository.findOne({
        where: {
            title,
        },
    })

    if (existingBlog) {
        return res.status(409).send({
            message: 'Blog already exists',
        })
    }

    const newBlog = blogRepository.create({
        title,
        authorId,
        publishedDate: new Date().toISOString(),
        content,
    })

    await blogRepository.save(newBlog)

    return res.status(201).send({
        message: 'New blog created',
        data: newBlog,
    })
}
