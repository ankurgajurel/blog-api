import { Router } from 'express'

import { signup } from './signup.controller'
import { login } from './login.controller'

const authRouters: Router = Router()

authRouters.post('/signup', signup)
authRouters.post('/login', login)

export default authRouters
