import { Request, Response } from 'express';
import { DatabaseConfig } from '../../dataSource';
import { Blog } from '../../entity/Blog';

export async function getEachBlog(req: Request, res: Response) {
    const { id } = req.body;

    const blogRepository = DatabaseConfig.getRepository(Blog);

    const blog = await blogRepository.findOne({
        where: {
            id
        }
    });

    if (!blog) {
        res.status(404).send({
            message: 'Blog not found'
        });

        return;
    }

    res.status(200).send({
        message: 'Blog',
        data: blog
    });
}