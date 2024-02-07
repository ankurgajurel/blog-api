import { Response, Request } from 'express'
import { DatabaseConfig } from '../../dataSource'
import { Blog } from '../../entity/Blog'

export async function deleteBlog(req: Request, res: Response) {
    const { id } = req.body

    const blogRepository = DatabaseConfig.getRepository(Blog)

    const blog = await blogRepository.findOne({
        where: {
            id,
        },
    })

    if (!blog) {
        res.status(404).send({
            message: 'Blog not found',
        })

        return
    }

    await blogRepository.remove(blog)

    res.status(200).send({
        message: 'Blog deleted',
    })
}
