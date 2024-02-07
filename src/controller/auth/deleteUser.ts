import { Request, Response } from 'express';
import { DatabaseConfig } from '../../dataSource';
import { Users } from '../../entity';

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }

    const usersRepository = DatabaseConfig.getRepository(Users);

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
        return res.status(400).json({ message: 'User not found.' });
    }

    await usersRepository.delete(id);

    return res.status(200).json({ message: 'User deleted.' });
}