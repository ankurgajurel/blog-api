import { Request, Response } from 'express'
import { Users } from '../../entity'
import { DatabaseConfig } from '../../dataSource'
import * as bcrypt from 'bcrypt'

export async function login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' })
    }

    const usersRepository = DatabaseConfig.getRepository(Users)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
        return res.status(400).json({ message: 'User not found.' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password.' })
    }

    return res.status(200).json({ message: 'Logged in.' })
}
