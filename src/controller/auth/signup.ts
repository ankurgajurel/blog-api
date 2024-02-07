import { Request, Response } from 'express';
import { DatabaseConfig } from '../../dataSource';

import * as bcrypt from "bcrypt"
import { Users } from '../../entity';


export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const usersRepository = DatabaseConfig.getRepository(Users);

    const user = await usersRepository.findOne({ where: { email } });
    if (user) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
        console.log('Error hashing password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

    if (!hashedPassword) {
        console.log('Hashed password is null');
        return res.status(500).json({ message: 'Internal server error' });
    }

    const newUser = usersRepository.create({
        email,
        password: hashedPassword,
        name
    });
    await usersRepository.save(newUser);

    return res.status(201).json({ message: 'User created.' });
};
