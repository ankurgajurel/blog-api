import { Response, Request } from 'express'
import { DatabaseConfig } from '../../dataSource'
import { Author } from '../../entity/Author'

export async function getBlogsByAuthor(req: Request, res: Response) {
    const { id } = req.body

    if (!id) {
        return res.status(400).send({
            message: 'Author id is required',
        })
    }

    const authorRepository = DatabaseConfig.getRepository(Author)

    const author = await authorRepository.findOne({
        where: {
            id,
        },
    })

    if (!author) {
        return res.status(404).send({
            message: 'Author not found',
        })
    }

    return res.status(200).send({
        message: 'Author blogs',
        data: author.blogs ? author.blogs : [],
    })
}
