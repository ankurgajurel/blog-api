import { Router } from 'express'

import { signup } from './signup'
import { login } from './login'

const authRouters: Router = Router()

authRouters.post('/signup', signup)
authRouters.post('/login', login)

export default authRouters
