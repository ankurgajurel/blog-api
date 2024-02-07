import { Response, Request } from 'express'
import { Author } from '../../entity/Author'
import { DatabaseConfig } from '../../dataSource'

export async function deleteAuthor(req: Request, res: Response) {
    const { id } = req.body

    if (!id) {
        res.status(400).send({
            message: 'Author id is required',
        })

        return
    }

    const authorRepository = DatabaseConfig.getRepository(Author)

    const author = await authorRepository.findOne({
        where: {
            id,
        },
    })

    if (!author) {
        res.status(404).send({
            message: 'Author not found',
        })

        return
    }

    await authorRepository.remove(author)

    res.status(200).send({
        message: 'Author deleted successfully',
        data: author,
    })

    return
}
