import { configDotenv } from 'dotenv'
configDotenv({ path: './.env.local' })

import * as express from 'express'
import { DatabaseConfig } from './dataSource'
import routers from './controller'

const app = express()

DatabaseConfig.initialize()
    .then(async () => {
        console.log('database connected')

        app.use(express.json())

        app.use('/api/v1/author', routers.authorRouters)
        app.use('/api/v1/blog', routers.blogRouters)
        app.use('/api/v1/auth', routers.authRouters)

        app.listen(3000, () => {
            console.log('server is running on port 3000')
        })
    })
    .catch((err) => console.log('something went wrong', err))
