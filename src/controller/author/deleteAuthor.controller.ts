import { Response, Request } from 'express'
import { Author } from '../../entity/Author.entity'
import { DatabaseConfig } from '../../dataSource'

export async function deleteAuthor(req: Request, res: Response) {
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

    await authorRepository.remove(author)

    return res.status(200).send({
        message: 'Author deleted successfully',
        data: author,
    })
}
