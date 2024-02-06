import { Request, Response } from 'express';
import { Blog } from '../../entity/Blog';
import { DatabaseConfig } from '../../dataSource';

export async function getAllBlogs(req: Request, res: Response) {
    const blogRepository = DatabaseConfig.getRepository(Blog);

    const blogs = await blogRepository.find();

    res.status(200).send({
        message: 'All blogs',
        data: blogs
    });
}